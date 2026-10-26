import { kv } from '@vercel/kv'

const COUPON_KEY_PREFIX = 'coupon:usage:'

export async function getCouponUsage(code: string): Promise<number> {
  try {
    const key = `${COUPON_KEY_PREFIX}${code.toUpperCase()}`
    return (await kv.get<number>(key)) || 0
  } catch (error) {
    console.error('Error reading coupon usage from KV:', error)
    return 0
  }
}

export async function incrementCouponUsage(code: string): Promise<number> {
  const key = `${COUPON_KEY_PREFIX}${code.toUpperCase()}`
  return await kv.incr(key)
}

export async function recordPaymentCouponUsage(code: string, paymentId: string): Promise<void> {
  // A retried notification must not count the same payment more than once.
  await kv.eval(
    `if redis.call('EXISTS', KEYS[1]) == 0 then
      redis.call('INCR', KEYS[2])
      redis.call('SET', KEYS[1], '1')
      return 1
    end
    return 0`,
    [`coupon:payment:${paymentId}`, `${COUPON_KEY_PREFIX}${code.toUpperCase()}`],
    [],
  )
}
