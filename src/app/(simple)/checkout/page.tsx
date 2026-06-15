'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import BackButton from '@/components/ui/BackButton'
import { ctaConfig, paymentConfig } from '@/lib/constants'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')

  const [couponCode, setCouponCode] = useState('')
  const [couponStatus, setCouponStatus] = useState<{
    valid: boolean
    message: string
    discountedPrice?: number
  } | null>(null)
  const [checkingCoupon, setCheckingCoupon] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleValidateCoupon() {
    if (!couponCode.trim()) return
    setCheckingCoupon(true)
    setCouponStatus(null)

    try {
      const res = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim() }),
      })
      const data = await res.json()

      if (data.valid) {
        setCouponStatus({
          valid: true,
          message: `Cupom aplicado! Desconto de ${data.coupon.type === 'percentage' ? `${data.coupon.discount}%` : `R$ ${data.coupon.discount.toFixed(2)}`}`,
          discountedPrice: data.discountedPrice,
        })
      } else {
        setCouponStatus({ valid: false, message: data.error })
      }
    } catch {
      setCouponStatus({ valid: false, message: 'Erro ao validar cupom' })
    } finally {
      setCheckingCoupon(false)
    }
  }

  async function handlePay() {
    setLoading(true)

    try {
      const res = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          couponCode: couponStatus?.valid ? couponCode.trim() : undefined,
        }),
      })
      const data = await res.json()

      if (data.error) {
        alert(data.error)
        setCouponStatus(null)
        setCouponCode('')
        setLoading(false)
        return
      }

      if (data.initPoint) {
        if (couponStatus?.valid && couponCode.trim()) {
          localStorage.setItem('usedCoupon', couponCode.trim())
        }
        window.location.href = data.initPoint
      } else {
        alert('Erro ao gerar pagamento. Tente novamente.')
      }
    } catch {
      alert('Erro ao conectar com o Mercado Pago. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const displayPrice = couponStatus?.valid && couponStatus.discountedPrice !== undefined
    ? couponStatus.discountedPrice
    : paymentConfig.price

  return (
    <>
      {status === 'failure' && (
        <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
          O pagamento não foi concluído. Tente novamente.
        </div>
      )}
      {status === 'pending' && (
        <div className="mb-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-center text-yellow-300">
          Pagamento pendente. Assim que for confirmado, você receberá o acesso.
        </div>
      )}

      <div className="mb-8 text-center">
        <h1 className="heading-1 mb-4">Finalizar Inscrição</h1>
        <p className="body-text mx-auto max-w-xl">
          Garanta sua vaga no <strong>Desafio 21 Dias por Você</strong> com acompanhamento
          especializado.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-5">
        <div className="glass rounded-2xl p-4 sm:p-6 md:col-span-2">
          <h2 className="heading-3 mb-6">Resumo do Pedido</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10 sm:h-16 sm:w-16">
                <Image
                  src="/images/logo6.webp"
                  alt="Desafio 21 dias"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-century font-bold text-white">
                  {paymentConfig.productName}
                </h3>
                <p className="text-sm text-white/60">
                  Acesso completo ao programa
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between text-white/80">
                <span>Valor</span>
                <span>R$ {paymentConfig.price.toFixed(2)}</span>
              </div>
              {couponStatus?.valid && (
                <div className="mt-1 flex justify-between text-neon-green">
                  <span>Desconto</span>
                  <span>- R$ {(paymentConfig.price - (couponStatus.discountedPrice ?? paymentConfig.price)).toFixed(2)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-century font-bold text-white">
                <span>Total</span>
                <span className="text-neon-green">
                  R$ {displayPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/10 pt-4">
            <Image
              src="/images/logo_mercadoPago.webp"
              alt="Mercado Pago"
              width={200}
              height={100}
              className="max-w-full h-auto w-auto object-contain"
            />
          </div>
        </div>

        <div className="glass rounded-2xl p-4 sm:p-6 md:col-span-3">
          <h2 className="heading-3 mb-6">Pagamento via PIX</h2>

          <div className="mb-6 flex items-center gap-3 rounded-xl bg-white/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-green/20">
              <span className="text-lg font-bold text-neon-green">PIX</span>
            </div>
            <div>
              <p className="font-century font-bold text-white">
                Pagamento Instantâneo
              </p>
              <p className="text-sm text-white/60">
                Aprovação em segundos, 7 dias de garantia
              </p>
            </div>
          </div>

          <ul className="mb-8 space-y-3 text-white/70">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-neon-green">✓</span>
              <span>Pagamento 100% seguro via Mercado Pago</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-neon-green">✓</span>
              <span>Pagamento via PIX com aprovação instantânea</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-neon-green">✓</span>
              <span>Acesso imediato após confirmação do pagamento</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-neon-green">✓</span>
              <span>7 dias de garantia incondicional</span>
            </li>
          </ul>

          <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <label htmlFor="coupon" className="mb-2 block text-sm font-bold text-white/70">
              Cupom de desconto
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="coupon"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Digite seu cupom"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-neon-green sm:flex-1"
              />
              <button
                onClick={handleValidateCoupon}
                disabled={checkingCoupon || !couponCode.trim()}
                className="touch-target w-full rounded-xl bg-white/10 px-5 font-century font-bold text-white transition-all duration-300 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {checkingCoupon ? '...' : 'Aplicar'}
              </button>
            </div>
            {couponStatus && (
              <p className={`mt-2 text-sm ${couponStatus.valid ? 'text-neon-green' : 'text-red-400'}`}>
                {couponStatus.message}
              </p>
            )}
          </div>

          <button
            onClick={handlePay}
            disabled={loading}
            className="touch-target block w-full rounded-full bg-gradient-cta px-8 py-5 text-center font-century font-bold text-white transition-all duration-300 hover:scale-[1.02] shadow-neon disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Aguarde...' : `Pagar`}
          </button>

          <p className="mt-4 text-center text-xs text-white/40">
            Ao clicar, voce sera redirecionado para o ambiente seguro do
            Mercado Pago.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:flex sm:flex-wrap sm:justify-center">
        <div className="glass-light rounded-xl px-5 py-3 sm:w-auto">
          <p className="font-century text-sm font-bold text-white">
            Pagamento Seguro
          </p>
          <p className="text-xs text-white/50">Mercado Pago</p>
        </div>
        <div className="glass-light rounded-xl px-5 py-3 sm:w-auto">
          <p className="font-century text-sm font-bold text-white">
            Garantia de 7 Dias
          </p>
          <p className="text-xs text-white/50">Devolução total</p>
        </div>
        <div className="glass-light rounded-xl px-5 py-3 sm:w-auto">
          <p className="font-century text-sm font-bold text-white">
            Suporte Direto
          </p>
          <p className="text-xs text-white/50">Via WhatsApp</p>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <section className="relative min-h-screen overflow-hidden py-20 md:py-28">
      <BackButton />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg-lines1.webp"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-16">
        <Suspense fallback={null}>
          <CheckoutContent />
        </Suspense>
      </div>
    </section>
  )
}
