import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextRequest, NextResponse } from 'next/server'
import { recordPaymentCouponUsage } from '@/lib/couponStore'
import { verifyMercadoPagoSignature } from '@/lib/mercadoPagoWebhook'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
})

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET
    if (!secret) {
      console.error('Webhook secret is not configured')
      return NextResponse.json({ error: 'Webhook unavailable' }, { status: 503 })
    }
    const xSignature = request.headers.get('x-signature') || ''
    const xRequestId = request.headers.get('x-request-id') || ''
    const dataId = request.nextUrl.searchParams.get('data.id') || ''

    if (!verifyMercadoPagoSignature(dataId, xSignature, xRequestId, secret)) {
      console.warn('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (body?.type === 'payment') {
      if (!/^\d+$/.test(dataId) || String(body.data?.id) !== dataId) {
        return NextResponse.json({ error: 'Invalid payment ID' }, { status: 400 })
      }
      const payment = await new Payment(client).get({ id: dataId })

      const status = payment.status
      const metadata = payment.metadata || {}

      console.log('Payment received:', {
        id: payment.id,
        status,
        coupon: metadata.coupon,
      })

      if (status === 'approved' && metadata.coupon) {
        await recordPaymentCouponUsage(String(metadata.coupon), String(payment.id))
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
