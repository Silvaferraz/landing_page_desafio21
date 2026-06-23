import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('id')

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID is required' }, { status: 400 })
    }

    const payment = await new Payment(client).get({ id: Number(paymentId) })

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      statusDetail: payment.status_detail,
    })
  } catch (error) {
    console.error('Error checking payment:', error)
    return NextResponse.json({ error: 'Error checking payment' }, { status: 500 })
  }
}
