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
