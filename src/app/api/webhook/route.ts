import crypto from 'crypto'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextRequest, NextResponse } from 'next/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
})

function verifySignature(
  rawBody: string,
  xSignature: string,
  xRequestId: string
): boolean {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET
  if (!secret) return true

  const parts = xSignature.split(',')
  const tsPart = parts.find((p) => p.trim().startsWith('ts='))
  const v1Part = parts.find((p) => p.trim().startsWith('v1='))
  if (!tsPart || !v1Part) return false

  const ts = tsPart.split('=')[1]
  const receivedHash = v1Part.split('=')[1]

  const dataToSign = `id:${xRequestId};ts:${ts};`
  const computedHash = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(computedHash),
    Buffer.from(receivedHash)
  )
}

export async function POST(request: NextRequest) {
  try {
    const xSignature = request.headers.get('x-signature') || ''
    const xRequestId = request.headers.get('x-request-id') || ''
    const rawBody = await request.text()

    if (!verifySignature(rawBody, xSignature, xRequestId)) {
      console.warn('Invalid webhook signature')
      return NextResponse.json({ received: true })
    }

    const body = JSON.parse(rawBody)

    if (body.type === 'payment') {
      const paymentId = body.data.id
      const payment = await new Payment(client).get({ id: paymentId })

      const status = payment.status
      const metadata = payment.metadata || {}

      console.log('Payment received:', {
        id: paymentId,
        status,
        coupon: metadata.coupon,
        payerEmail: payment.payer?.email,
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ received: true })
  }
}
