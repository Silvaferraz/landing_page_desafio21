import crypto from 'crypto'

export function verifyMercadoPagoSignature(
  dataId: string,
  signature: string,
  requestId: string,
  secret: string,
): boolean {
  if (!secret || !dataId || !requestId) return false
  const parts = signature.split(',').map(part => part.trim().split('='))
  const ts = parts.find(([key]) => key === 'ts')?.[1]?.trim()
  const hash = parts.find(([key]) => key === 'v1')?.[1]?.trim()
  if (!ts || !/^\d+$/.test(ts) || !hash || !/^[a-f\d]{64}$/i.test(hash)) return false
  const manifest = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest()
  return crypto.timingSafeEqual(expected, Buffer.from(hash, 'hex'))
}
