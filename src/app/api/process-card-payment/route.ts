import { MercadoPagoConfig, Payment } from 'mercadopago'
import { NextResponse } from 'next/server'
import { paymentConfig, coupons } from '@/lib/constants'
import { getCouponUsage } from '@/lib/couponStore'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || '',
})

export async function POST(request: Request) {
  try {
    const { token, issuerId, paymentMethodId, installments, payer, couponCode } = await request.json()

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
        token,
        description: paymentConfig.productName,
        installments,
        payment_method_id: paymentMethodId,
        issuer_id: issuerId,
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
        payer: {
          email: payer?.email || 'comprador@desafio21dias.com.br',
          identification: payer?.identification,
        },
        metadata: { coupon: appliedCoupon?.code || '' },
      },
    })

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      statusDetail: payment.status_detail,
    })
  } catch (error) {
    console.error('Error processing card payment:', error)
    return NextResponse.json({ error: 'Erro ao processar pagamento' }, { status: 500 })
  }
}
