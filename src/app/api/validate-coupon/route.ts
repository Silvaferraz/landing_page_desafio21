import { NextResponse } from 'next/server'
import { coupons, paymentConfig } from '@/lib/constants'
import { getCouponUsage } from '@/lib/couponStore'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ valid: false, error: 'Código não informado' })
    }

    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
    )

    if (!coupon) {
      return NextResponse.json({ valid: false, error: 'Cupom inválido ou expirado' })
    }

    if (coupon.maxUses) {
      const usedCount = await getCouponUsage(coupon.code)
      if (usedCount >= coupon.maxUses) {
        return NextResponse.json({ valid: false, error: 'Cupom esgotado! Todas as vagas foram preenchidas.' })
      }
    }

    let discountedPrice = paymentConfig.price
    if (coupon.type === 'percentage') {
      discountedPrice = paymentConfig.price - (paymentConfig.price * coupon.discount) / 100
    } else {
      discountedPrice = Math.max(0, paymentConfig.price - coupon.discount)
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        discount: coupon.discount,
        type: coupon.type,
      },
      originalPrice: paymentConfig.price,
      discountedPrice,
    })
  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { error: 'Erro ao validar cupom' },
      { status: 500 }
    )
  }
}
