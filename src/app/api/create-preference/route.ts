import { MercadoPagoConfig, Preference } from 'mercadopago'
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
            return NextResponse.json({ error: 'Cupom esgotado! Todas as vagas foram preenchidas.' })
          }
        }
        appliedCoupon = { code: coupon.code, discount: coupon.discount, type: coupon.type }
        price =
          coupon.type === 'percentage'
            ? price - (price * coupon.discount) / 100
            : Math.max(0, price - coupon.discount)
      }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: 'desafio-21-dias',
            title: paymentConfig.productName,
            description: 'Acesso completo ao programa Desafio 21 Dias por Você',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: price,
          },
        ],
        back_urls: {
          success: `${siteUrl}/obrigado`,
          failure: `${siteUrl}/checkout?status=failure`,
          pending: `${siteUrl}/checkout?status=pending`,
        },
        auto_return: 'approved',
        notification_url: `${siteUrl}/api/webhook`,
        metadata: {
          coupon: appliedCoupon?.code || '',
        },
      },
    })

    return NextResponse.json({
      id: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    })
  } catch (error) {
    console.error('Error creating preference:', error)
    return NextResponse.json(
      { error: 'Erro ao criar preferência de pagamento' },
      { status: 500 }
    )
  }
}
