import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
})

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('id')

    if (!paymentId || !/^\d+$/.test(paymentId)) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
    }

    const payment = await new Payment(client).get({ id: paymentId })

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      statusDetail: payment.status_detail,
      amount: payment.transaction_amount,
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Error checking payment:', error)
    return NextResponse.json({ error: 'Error checking payment' }, { status: 500 })
  }
}
