const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const vm = require('node:vm')
const crypto = require('node:crypto')
const ts = require('typescript')

function load(file, overrides = {}, extra = {}) {
  const module = { exports: {} }
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText
  vm.runInNewContext(code, {
    module, exports: module.exports, require: name => name in overrides ? overrides[name] : require(name),
    Buffer, URL, console: { log() {}, warn() {}, error() {} }, AbortController, ...extra,
  }, { filename: file })
  return module.exports
}

const pending = load('src/lib/pendingPayment.ts')
const signature = load('src/lib/mercadoPagoWebhook.ts')
const secret = 'local-fixture-secret'
const id = '123456789'
const requestId = 'test-request'
const timestamp = '1793059200'
function signed(dataId = id) {
  const hash = crypto.createHmac('sha256', secret)
    .update(`id:${dataId.toLowerCase()};request-id:${requestId};ts:${timestamp};`).digest('hex')
  return `ts=${timestamp},v1=${hash}`
}

test('webhook accepts official signatures and rejects forged/malformed/missing credentials', () => {
  const verify = signature.verifyMercadoPagoSignature
  assert.equal(verify(id, signed(), requestId, secret), true)
  assert.equal(verify('ABC123', signed('ABC123'), requestId, secret), true)
  assert.equal(verify('999', signed(), requestId, secret), false)
  for (const header of ['', `ts=${timestamp},v1=invalid`, `ts=${timestamp},v1=${'0'.repeat(64)}`]) {
    assert.equal(verify(id, header, requestId, secret), false)
  }
  assert.equal(verify(id, signed(), requestId, ''), false)
})

function webhookHarness() {
  const env = { MERCADO_PAGO_WEBHOOK_SECRET: secret }
  const state = { queries: 0, records: 0, failPayment: false, failRecord: false, status: 'approved' }
  const route = load('src/app/api/webhook/route.ts', {
    mercadopago: {
      MercadoPagoConfig: class {},
      Payment: class { async get({ id: paymentId }) {
        state.queries++
        assert.equal(paymentId, id)
        if (state.failPayment) throw new Error('Unavailable')
        return { id: paymentId, status: state.status, metadata: { coupon: 'DESAFIO21' } }
      } },
    },
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200 }) } },
    '@/lib/mercadoPagoWebhook': signature,
    '@/lib/couponStore': { recordPaymentCouponUsage: async () => {
      if (state.failRecord) throw new Error('Redis unavailable')
      state.records++
    } },
  }, { process: { env } })
  const request = (header = signed(), bodyId = id) => ({
    nextUrl: new URL(`https://example.test/api/webhook?data.id=${id}`),
    headers: new Headers({ 'x-signature': header, 'x-request-id': requestId }),
    json: async () => ({ type: 'payment', data: { id: bodyId } }),
  })
  return { route, request, state, env }
}

test('webhook checks Mercado Pago before recording approval and exposes failures for retries', async () => {
  const h = webhookHarness()
  assert.equal((await h.route.POST(h.request(''))).status, 401)
  assert.equal(h.state.queries, 0)
  assert.equal((await h.route.POST(h.request(signed(), '999'))).status, 400)
  assert.equal(h.state.queries, 0)
  assert.equal((await h.route.POST(h.request())).status, 200)
  assert.equal(h.state.records, 1)
  h.state.status = 'pending'
  assert.equal((await h.route.POST(h.request())).status, 200)
  assert.equal(h.state.records, 1)
  h.state.failPayment = true
  assert.equal((await h.route.POST(h.request())).status, 500)
  h.state.failPayment = false
  h.state.status = 'approved'
  h.state.failRecord = true
  assert.equal((await h.route.POST(h.request())).status, 500)
  delete h.env.MERCADO_PAGO_WEBHOOK_SECRET
  assert.equal((await h.route.POST(h.request())).status, 503)
})

test('stored payment recovers PIX/card safely and rejects corrupted data', () => {
  for (const method of ['pix', 'card']) {
    const payment = { id: 123, method, amount: 69.9, ...(method === 'pix' ? { pix: { qrCodeBase64: 'png', qrCodeText: 'pix' } } : {}) }
    assert.equal(pending.parsePendingPayment(JSON.stringify(payment)).id, 123)
  }
  assert.equal(pending.parsePendingPayment('{"id":1,"method":"pix","amount":69.9}').id, 1)
  for (const value of [null, '{broken', '{}', '{"id":-1}', '{"id":1,"method":"pix","amount":69.9,"pix":{}}']) {
    assert.equal(pending.parsePendingPayment(value), null)
  }
})

function trackingHarness(saved, options = {}) {
  const slots = [], deps = [], cleanups = [], jobs = []
  let cursor = 0, dirty = false, result, timerId = 0
  const intervals = new Map(), events = new Map(), storage = new Map()
  if (saved) storage.set(pending.PENDING_PAYMENT_KEY, JSON.stringify(saved))
  const navigation = [], responses = [], requests = []
  const location = { href: options.href || 'https://example.test/checkout/', replace: path => navigation.push(path) }
  const router = { replace: path => navigation.push(path) }
  const react = {
    useRef(initial) {
      const slot = cursor++
      if (!(slot in slots)) slots[slot] = { current: initial }
      return slots[slot]
    },
    useState(initial) {
      const slot = cursor++
      if (!(slot in slots)) slots[slot] = initial
      return [slots[slot], value => { const next = typeof value === 'function' ? value(slots[slot]) : value; if (!Object.is(slots[slot], next)) { slots[slot] = next; dirty = true } }]
    },
    useCallback: fn => fn,
    useEffect(fn, nextDeps) {
      const slot = cursor++
      if (!deps[slot] || nextDeps.some((d, i) => !Object.is(d, deps[slot][i]))) {
        deps[slot] = nextDeps
        jobs.push(() => { cleanups[slot]?.(); cleanups[slot] = fn() })
      }
    },
  }
  const target = {
    addEventListener: (name, fn) => events.set(name, fn),
    removeEventListener: name => events.delete(name),
  }
  const hook = load('src/hooks/usePaymentConfirmation.ts', {
    react, 'next/navigation': { useRouter: () => router }, '@/lib/pendingPayment': pending,
  }, {
    localStorage: {
      getItem: key => { if (options.readStorageFails) throw Error('Storage disabled'); return storage.get(key) || null },
      setItem: (key, value) => { if (options.storageFails) throw Error('Storage disabled'); storage.set(key, value) },
      removeItem: key => storage.delete(key),
    },
    window: {
      ...target,
      location,
      history: { state: null, replaceState: (_state, _unused, url) => { location.href = url } },
      setInterval: fn => { intervals.set(++timerId, fn); return timerId },
      clearInterval: id => intervals.delete(id), setTimeout: () => ++timerId, clearTimeout() {},
    },
    document: target,
    fetch: async (url, init) => {
      requests.push({ url, init })
      const next = responses.shift() || { status: 'pending' }
      if (next instanceof Error) throw next
      if (next && typeof next.then === 'function') return next
      return { ok: !next.error, json: async () => next }
    },
  }).default
  const render = () => {
    dirty = false; cursor = 0; result = hook()
    while (jobs.length) jobs.shift()()
  }
  const flush = async () => {
    for (let i = 0; i < 6; i++) {
      if (dirty || !result) render()
      await new Promise(resolve => setImmediate(resolve))
    }
  }
  return { flush, get result() { return result }, navigation, responses, requests, storage, events, location,
    tick: () => { for (const fn of intervals.values()) fn() },
    unmount: () => { for (const fn of cleanups) fn?.() },
  }
}

for (const method of ['pix', 'card']) {
  test(`${method}: restore after reload, wait for approval, then open thank-you page once`, async () => {
    const payment = { id: 123, method, amount: 69.9, ...(method === 'pix' ? { pix: { qrCodeBase64: 'png', qrCodeText: 'pix' } } : {}) }
    const h = trackingHarness(payment)
    await h.flush()
    assert.equal(h.result.payment.id, 123)
    assert.equal(h.navigation.length, 0)
    assert.equal(h.requests[0].init.cache, 'no-store')
    h.responses.push({ status: 'approved' })
    h.events.get('focus')()
    await h.flush()
    assert.deepEqual(h.navigation, ['/obrigado/'])
    h.tick(); await h.flush()
    assert.equal(h.navigation.length, 1)
    assert.ok(h.storage.has(pending.PENDING_PAYMENT_KEY), 'keep recovery reference until thank-you page loads')
    h.unmount()
  })
}

test('network failure retries without losing payment or prompting another charge', async () => {
  const h = trackingHarness({ id: 123, method: 'card', amount: 69.9 })
  h.responses.push(new Error('Offline'))
  await h.flush()
  assert.match(h.result.message, /não faça outro pagamento/)
  assert.equal(h.navigation.length, 0)
  h.responses.push({ status: 'approved' }); h.tick(); await h.flush()
  assert.deepEqual(h.navigation, ['/obrigado/'])
  h.unmount()
})

test('declined payment never opens group; disabled storage does not block approval', async () => {
  const h = trackingHarness({ id: 123, method: 'card', amount: 69.9 })
  h.responses.push({ status: 'rejected' }); await h.flush()
  assert.equal(h.result.payment, null)
  assert.equal(h.storage.has(pending.PENDING_PAYMENT_KEY), false)
  assert.equal(h.navigation.length, 0)
  h.unmount()
  const other = trackingHarness(null, { storageFails: true })
  await other.flush()
  other.responses.push({ status: 'approved' })
  other.result.trackPayment({ id: 456, method: 'card', amount: 69.9 })
  await other.flush()
  assert.deepEqual(other.navigation, ['/obrigado/'])
  other.unmount()
})

test('card already approved redirects immediately even when the follow-up API is unavailable', async () => {
  const h = trackingHarness(null)
  await h.flush()
  h.responses.push(new Error('Status API unavailable'))
  h.result.trackPayment({ id: 789, method: 'card', amount: 69.9 }, true)
  assert.deepEqual(h.navigation, ['/obrigado/'])
  await h.flush()
  assert.equal(h.result.approved, true)
  assert.equal(h.requests.length, 0, 'confirmed card must not depend on a second API request')
  assert.ok(h.storage.has(pending.PENDING_PAYMENT_KEY))
  h.unmount()
})

test('manual verification retries immediately and navigates only after confirmation', async () => {
  const h = trackingHarness({ id: 123, method: 'card', amount: 69.9 })
  await h.flush()
  assert.equal(h.requests.length, 1)
  assert.equal(h.navigation.length, 0)
  h.responses.push({ status: 'approved' })
  h.result.checkNow()
  await h.flush()
  assert.equal(h.requests.length, 2)
  assert.deepEqual(h.navigation, ['/obrigado/'])
  h.unmount()
})

test('verification shows loading and ignores repeated clicks and polling during the same request', async () => {
  const h = trackingHarness({ id: 123, method: 'card', amount: 69.9 })
  await h.flush()
  assert.equal(h.result.isChecking, false)
  let finish
  h.responses.push(new Promise(resolve => { finish = resolve }))
  h.result.checkNow()
  h.result.checkNow()
  h.result.checkNow()
  h.tick()
  await h.flush()
  assert.equal(h.result.isChecking, true)
  assert.equal(h.requests.length, 2, 'only the initial check and one manual check are sent')
  finish({ ok: true, json: async () => ({ status: 'pending' }) })
  await h.flush()
  assert.equal(h.result.isChecking, false)
  h.responses.push(new Error('Network error'))
  h.result.checkNow()
  await h.flush()
  assert.equal(h.result.isChecking, false, 'network errors must release the button')
  h.unmount()
})

test('payment URL recovers approval when browser storage is unavailable', async () => {
  const h = trackingHarness(null, { readStorageFails: true, href: 'https://example.test/checkout/?payment_id=123' })
  h.responses.push({ status: 'approved', amount: 55.22 })
  await h.flush()
  assert.equal(h.result.payment.id, 123)
  assert.equal(h.result.payment.amount, 55.22)
  assert.deepEqual(h.navigation, ['/obrigado/'])
  h.unmount()
  assert.equal(pending.paymentFromRecoveryUrl('https://example.test/?payment_id=invalid'), null)
  assert.equal(pending.paymentFromRecoveryUrl('https://example.test/?payment_id=0'), null)
})

test('payment URL is saved even when browser storage refuses writes', async () => {
  const h = trackingHarness(null, { storageFails: true })
  await h.flush()
  h.result.trackPayment({ id: 456, method: 'card', amount: 69.9 })
  assert.equal(new URL(h.location.href).searchParams.get('payment_id'), '456')
  await h.flush()
  assert.equal(h.result.payment.id, 456)
  h.unmount()
})

test('returning from bank app restarts a suspended request instead of waiting forever', async () => {
  const h = trackingHarness({ id: 123, method: 'card', amount: 69.9 })
  h.responses.push(new Promise(() => {}))
  await h.flush()
  assert.equal(h.requests.length, 1)
  h.responses.push({ status: 'approved' })
  h.events.get('visibilitychange')()
  await h.flush()
  assert.equal(h.requests.length, 2)
  assert.equal(h.requests[0].init.signal.aborted, true)
  assert.deepEqual(h.navigation, ['/obrigado/'])
  h.unmount()
})

test('status endpoint confirms approval independently of Redis and disables caching', async () => {
  const route = load('src/app/api/check-payment/route.ts', {
    mercadopago: { MercadoPagoConfig: class {}, Payment: class { async get({ id: paymentId }) {
      assert.equal(paymentId, id)
      return { id: paymentId, status: 'approved', transaction_amount: 69.9 }
    } } },
    'next/server': { NextResponse: { json: (body, options) => ({ body, status: options?.status || 200, headers: options?.headers }) } },
    '@/lib/couponStore': new Proxy({}, { get() { throw Error('Redis unavailable') } }),
    '@vercel/kv': new Proxy({}, { get() { throw Error('Redis unavailable') } }),
  }, { process: { env: {} } })
  const res = await route.GET(new Request(`https://example.test/api/check-payment?id=${id}`))
  assert.equal(res.status, 200)
  assert.equal(res.body.status, 'approved')
  assert.equal(res.headers['Cache-Control'], 'no-store')
})
