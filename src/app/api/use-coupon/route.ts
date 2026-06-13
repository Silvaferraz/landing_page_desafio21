import { NextResponse } from 'next/server'
import { coupons } from '@/lib/constants'
import { getCouponUsage, incrementCouponUsage } from '@/lib/couponStore'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: 'Código não informado' }, { status: 400 })
    }

    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
    )

    if (!coupon) {
      return NextResponse.json({ error: 'Cupom inválido' }, { status: 400 })
    }

    if (coupon.maxUses) {
      const usedCount = await getCouponUsage(coupon.code)
      if (usedCount >= coupon.maxUses) {
        return NextResponse.json({ error: 'Cupom já esgotado' }, { status: 400 })
      }
      await incrementCouponUsage(coupon.code)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error using coupon:', error)
    return NextResponse.json({ error: 'Erro ao processar cupom' }, { status: 500 })
  }
}
