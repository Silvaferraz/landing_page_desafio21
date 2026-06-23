import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'
import { paymentConfig, coupons } from '@/lib/constants'
import { getCouponUsage } from '@/lib/couponStore'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
})

export async function POST(request: Request) {
  try {
    const { couponCode } = await request.json()

    let price = paymentConfig.price
    let appliedCoupon: { code: string; discount: number; type: string } | null = null

    if (couponCode) {
      const coupon = coupons.find(
        (c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.active
      )
      if (coupon) {
        if (coupon.maxUses) {
          const usedCount = await getCouponUsage(coupon.code)
          if (usedCount >= coupon.maxUses) {
            return NextResponse.json({ error: 'Cupom esgotado!' })
          }
        }
        appliedCoupon = { code: coupon.code, discount: coupon.discount, type: coupon.type }
        price =
          coupon.type === 'percentage'
            ? price - (price * coupon.discount) / 100
            : Math.max(0, price - coupon.discount)
        price = Math.round(price * 100) / 100
      }
    }

    const payment = await new Payment(client).create({
      body: {
        transaction_amount: price,
        description: paymentConfig.productName,
        payment_method_id: 'pix',
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
        payer: { email: 'comprador@desafio21dias.com.br' },
        metadata: { coupon: appliedCoupon?.code || '' },
      },
    })

    const txData = payment.point_of_interaction?.transaction_data

    return NextResponse.json({
      id: payment.id,
      qrCodeBase64: txData?.qr_code_base64 || null,
      qrCodeText: txData?.qr_code || null,
      ticketUrl: txData?.ticket_url || null,
    })
  } catch (error) {
    console.error('Error creating PIX payment:', error)
    return NextResponse.json({ error: 'Erro ao gerar PIX' }, { status: 500 })
  }
}
