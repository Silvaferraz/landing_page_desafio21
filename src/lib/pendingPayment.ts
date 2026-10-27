export const PENDING_PAYMENT_KEY = 'desafio21:pending-payment'

export interface PendingPayment {
  id: number
  method: 'pix' | 'card'
  amount: number
  pix?: { qrCodeBase64: string; qrCodeText: string }
}

export function parsePendingPayment(value: string | null): PendingPayment | null {
  try {
    const payment = JSON.parse(value || 'null') as PendingPayment | null
    if (!payment || !Number.isSafeInteger(payment.id) || payment.id <= 0 ||
      !['pix', 'card'].includes(payment.method) ||
      !Number.isFinite(payment.amount) || payment.amount < 0) return null
    if (payment.pix && (
      typeof payment.pix.qrCodeBase64 !== 'string' ||
      typeof payment.pix.qrCodeText !== 'string')) return null
    return payment
  } catch {
    return null
  }
}

export function paymentFromRecoveryUrl(href: string): PendingPayment | null {
  try {
    const value = new URL(href).searchParams.get('payment_id') || ''
    if (!/^[1-9]\d*$/.test(value)) return null
    const id = Number(value)
    if (!Number.isSafeInteger(id)) return null
    // The amount and approval must come from Mercado Pago, never the URL.
    return { id, method: 'card', amount: 0 }
  } catch {
    return null
  }
}

export function isFinalPaymentFailure(status: string): boolean {
  return ['rejected', 'cancelled', 'refunded', 'charged_back'].includes(status)
}
