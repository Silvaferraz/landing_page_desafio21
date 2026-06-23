'use client'

import { Suspense, useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import BackButton from '@/components/ui/BackButton'
import { ctaConfig, paymentConfig } from '@/lib/constants'
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'

type PixData = {
  paymentId: number
  qrCodeBase64: string
  qrCodeText: string
}

type Tab = 'pix' | 'card'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const statusParam = searchParams.get('status')

  const [tab, setTab] = useState<Tab>('pix')
  const [couponCode, setCouponCode] = useState('')
  const [couponStatus, setCouponStatus] = useState<{
    valid: boolean
    message: string
    discountedPrice?: number
  } | null>(null)
  const [checkingCoupon, setCheckingCoupon] = useState(false)
  const [loading, setLoading] = useState(false)

  const [pixData, setPixData] = useState<PixData | null>(null)
  const [pixCopied, setPixCopied] = useState(false)
  const [cardError, setCardError] = useState('')
  const [cardProcessing, setCardProcessing] = useState(false)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current)
      pollingRef.current = null
    }
  }, [])

  useEffect(() => {
    initMercadoPago(paymentConfig.mercadoPagoPublicKey)
    return () => stopPolling()
  }, [stopPolling])

  useEffect(() => {
    if (pixData) {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/check-payment?id=${pixData.paymentId}`)
          const data = await res.json()
          if (data.status === 'approved') {
            stopPolling()
            router.push('/obrigado')
          }
        } catch {
          // retry
        }
      }, 3000)
    }
    return () => stopPolling()
  }, [pixData, router, stopPolling])

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

  async function handlePixPay() {
    setLoading(true)
    try {
      const res = await fetch('/api/create-pix', {
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
        return
      }
      if (data.id) {
        if (couponStatus?.valid && couponCode.trim()) {
          localStorage.setItem('usedCoupon', couponCode.trim())
        }
        setPixData({
          paymentId: data.id,
          qrCodeBase64: data.qrCodeBase64,
          qrCodeText: data.qrCodeText,
        })
      }
    } catch {
      alert('Erro ao gerar PIX. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopyPix() {
    if (!pixData) return
    try {
      await navigator.clipboard.writeText(pixData.qrCodeText)
      setPixCopied(true)
      setTimeout(() => setPixCopied(false), 3000)
    } catch {
      // fallback
    }
  }

  function getCardErrorReason(detail: string): string {
    const map: Record<string, string> = {
      'rejected': 'Pagamento recusado. Verifique os dados do cartão.',
      'rejected_high_risk': 'Pagamento recusado por risco. Tente outro cartão.',
      'rejected_insufficient_amount': 'Saldo insuficiente no cartão.',
      'rejected_invalid_installments': 'Parcelamento inválido para este cartão.',
      'rejected_card_disabled': 'Cartão bloqueado. Entre em contato com seu banco.',
      'cc_rejected_bad_filled_card_number': 'Número do cartão inválido.',
      'cc_rejected_bad_filled_date': 'Data de validade inválida.',
      'cc_rejected_bad_filled_other': 'Dados do cartão inválidos.',
      'cc_rejected_bad_filled_security_code': 'Código de segurança inválido.',
      'cc_rejected_blacklist': 'Cartão recusado. Tente outro forma de pagamento.',
      'cc_rejected_call_for_authorize': 'Cartão precisa de autorização. Ligue para seu banco.',
      'cc_rejected_card_disabled': 'Cartão bloqueado. Ative-o no app do banco.',
      'cc_rejected_duplicated_payment': 'Pagamento duplicado. Já processado anteriormente.',
      'cc_rejected_insufficient_amount': 'Limite do cartão insuficiente.',
      'cc_rejected_invalid_installments': 'Parcelamento não disponível.',
      'cc_rejected_max_attempts': 'Muitas tentativas. Tente novamente mais tarde.',
      'cc_rejected_other_reason': 'Cartão recusado. Tente outro cartão ou forma de pagamento.',
    }
    return map[detail] || 'Pagamento não aprovado. Tente novamente.'
  }

  async function handleCardSubmit(formData: any) {
    setCardError('')
    setCardProcessing(true)
    try {
      const res = await fetch('/api/process-card-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: formData.token,
          issuerId: formData.issuer_id,
          paymentMethodId: formData.payment_method_id,
          installments: formData.installments,
          payer: formData.payer,
          couponCode: couponStatus?.valid ? couponCode.trim() : undefined,
        }),
      })
      const data = await res.json()
      if (data.status === 'approved') {
        if (couponStatus?.valid && couponCode.trim()) {
          localStorage.setItem('usedCoupon', couponCode.trim())
        }
        window.location.href = '/obrigado'
        return
      }
      setCardError(getCardErrorReason(data.statusDetail || data.status))
    } catch {
      setCardError('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setCardProcessing(false)
    }
  }

  const displayPrice = couponStatus?.valid && couponStatus.discountedPrice !== undefined
    ? couponStatus.discountedPrice
    : paymentConfig.price

  if (pixData) {
    return (
      <>
        <div className="mb-8 text-center">
          <h1 className="heading-1 mb-4">Pagamento via PIX</h1>
          <p className="body-text mx-auto max-w-xl">
            Escaneie o QR code abaixo ou copie o código PIX para pagar.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="glass rounded-2xl p-6 text-center">
            <div className="mb-4 text-sm text-white/60">
              Valor: <span className="font-bold text-neon-green">R$ {displayPrice.toFixed(2)}</span>
            </div>

            <div className="mx-auto mb-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                alt="QR Code PIX"
                className="h-56 w-56 rounded-xl"
              />
            </div>

            <div className="mb-6">
              <p className="mb-2 text-sm text-white/60">Ou copie o código PIX:</p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={pixData.qrCodeText}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white/80 outline-none"
                />
                <button
                  onClick={handleCopyPix}
                  className="touch-target shrink-0 rounded-xl bg-neon-green/20 px-4 font-century font-bold text-neon-green transition-all duration-300 hover:bg-neon-green/30"
                >
                  {pixCopied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500/10 p-3 text-sm text-yellow-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              Aguardando pagamento...
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {statusParam === 'failure' && (
        <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
          O pagamento não foi concluído. Tente novamente.
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
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setTab('pix')}
              className={`touch-target flex-1 rounded-xl py-3 text-center font-century font-bold transition-all ${
                tab === 'pix'
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              PIX
            </button>
            <button
              onClick={() => { setTab('card'); setCardError('') }}
              className={`touch-target flex-1 rounded-xl py-3 text-center font-century font-bold transition-all ${
                tab === 'card'
                  ? 'bg-neon-green/20 text-neon-green'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              Cartão
            </button>
          </div>

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

          {tab === 'pix' && (
            <>
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

              <button
                onClick={handlePixPay}
                disabled={loading}
                className="touch-target block w-full rounded-full bg-gradient-cta px-8 py-5 text-center font-century font-bold text-white transition-all duration-300 hover:scale-[1.02] shadow-neon disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Gerando QR Code...' : 'Pagar com PIX'}
              </button>
            </>
          )}

          {tab === 'card' && (
            <div>
              <p className="mb-4 text-center text-xs text-white/50">
                Aceitamos cartões de <strong className="text-white">crédito</strong> e{' '}
                <strong className="text-white">débito</strong>. O tipo é detectado
                automaticamente pelo número do cartão.
              </p>
              {cardProcessing && (
                <div className="mb-4 rounded-xl bg-neon-green/10 p-3 text-center text-sm text-neon-green">
                  Processando pagamento...
                </div>
              )}
              {cardError && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-300">
                  {cardError}
                </div>
              )}
              <CardPayment
                initialization={{ amount: displayPrice }}
                customization={{
                  visual: { hideFormTitle: true },
                  paymentMethods: {
                    maxInstallments: 6,
                  },
                }}
                onSubmit={handleCardSubmit}
                onError={() => setCardError('Erro ao carregar formulário de pagamento.')}
                locale="pt-BR"
              />
            </div>
          )}

          <p className="mt-4 text-center text-xs text-white/40">
            Pagamento processado com segurança pelo Mercado Pago.
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
