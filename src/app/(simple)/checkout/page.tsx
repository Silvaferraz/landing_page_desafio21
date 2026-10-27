'use client'

import { Suspense, useState, useEffect } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import BackButton from '@/components/ui/BackButton'
import { ctaConfig, paymentConfig } from '@/lib/constants'
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react'
import usePaymentConfirmation from '@/hooks/usePaymentConfirmation'

type Tab = 'pix' | 'card'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const { payment, trackPayment, message: paymentMessage, approved, checkNow } = usePaymentConfirmation()
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

  const pixData = payment?.method === 'pix' ? payment.pix : null
  const [pixCopied, setPixCopied] = useState(false)
  const [cardError, setCardError] = useState('')
  const [cardProcessing, setCardProcessing] = useState(false)

  useEffect(() => {
    initMercadoPago(paymentConfig.mercadoPagoPublicKey)
  }, [])

  useEffect(() => {
    if (!couponCode.trim()) {
      setCouponStatus(null)
      return
    }
    const timer = setTimeout(() => {
      handleValidateCoupon()
    }, 500)
    return () => clearTimeout(timer)
  }, [couponCode])

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
      if (res.ok && data.id && data.qrCodeBase64 && data.qrCodeText) {
        trackPayment({
          id: data.id,
          method: 'pix',
          amount: displayPrice,
          pix: { qrCodeBase64: data.qrCodeBase64, qrCodeText: data.qrCodeText },
        })
      } else {
        throw new Error('Incomplete PIX response')
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
      if (res.ok && data.id && ['approved', 'pending', 'in_process', 'authorized', 'in_mediation'].includes(data.status)) {
        trackPayment({ id: data.id, method: 'card', amount: displayPrice }, data.status === 'approved')
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

  if (payment) {
    return (
      <>
        <div className="mb-8 text-center">
          <h1 className="heading-1 mb-4">{pixData ? 'Pagamento via PIX' : 'Confirmando pagamento'}</h1>
          <p className="body-text mx-auto max-w-xl">
            {pixData ? 'Escaneie o QR code abaixo ou copie o código PIX para pagar.' : 'Seu pagamento está sendo consultado. Assim que for aprovado, você será direcionada para o grupo.'}
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="glass rounded-2xl p-6 text-center">
            {payment.amount > 0 && <div className="mb-4 text-sm text-white/60">
              Valor: <span className="font-bold text-brand-pink">R$ {payment.amount.toFixed(2)}</span>
            </div>}

            {pixData && <><div className="mx-auto mb-6 flex justify-center">
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
                  className="touch-target shrink-0 rounded-xl bg-brand-pink/20 px-4 font-century font-bold text-brand-pink transition-all duration-300 hover:bg-brand-pink/30"
                >
                  {pixCopied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            </>}

            <div role="status" className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500/10 p-3 text-sm text-yellow-300">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              {approved ? 'Pagamento confirmado!' : 'Aguardando confirmação do pagamento...'}
            </div>
            <p className="mt-4 text-sm text-white/80">
              {approved ? 'Seu pagamento foi confirmado. Continue para acessar o grupo.' : paymentMessage || 'Se já pagou, não faça outro pagamento. Ao voltar a esta página neste navegador, retomaremos a confirmação automaticamente.'}
            </p>
            {approved ? (
              <div className="mt-4 flex flex-col gap-3">
                <a href="/obrigado/" className="touch-target rounded-full bg-[#FEA7EC] px-6 py-3 font-century font-bold text-white">
                  Continuar para o grupo
                </a>
                <a href={ctaConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="touch-target rounded-full border border-[#FEA7EC] px-6 py-3 font-century font-bold text-[#FEA7EC]">
                  Entrar no Grupo Exclusivo
                </a>
              </div>
            ) : (
              <button type="button" onClick={checkNow} className="touch-target mx-auto mt-4 rounded-full bg-[#FEA7EC] px-6 py-3 font-century font-bold text-white">
                Já paguei — verificar agora
              </button>
            )}
            <p className="mt-4 text-xs text-white/60">Número do pagamento: {payment.id}</p>
            <a href={ctaConfig.selenaLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-brand-pink underline">
              Já paguei e preciso de ajuda
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {paymentMessage && <p role="alert" className="mb-6 rounded-xl bg-yellow-500/10 p-4 text-yellow-300">{paymentMessage}</p>}
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
                  src="/images/icon_rosa.PNG"
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
                <div className="mt-1 flex justify-between text-brand-pink">
                  <span>Desconto</span>
                  <span>- R$ {(paymentConfig.price - (couponStatus.discountedPrice ?? paymentConfig.price)).toFixed(2)}</span>
                </div>
              )}
              <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-century font-bold text-white">
                <span>Total</span>
                <span className="text-brand-pink">
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
                  ? 'bg-brand-pink/20 text-brand-pink'
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              PIX
            </button>
            <button
              onClick={() => { setTab('card'); setCardError('') }}
              className={`touch-target flex-1 rounded-xl py-3 text-center font-century font-bold transition-all ${
                tab === 'card'
                  ? 'bg-brand-pink/20 text-brand-pink'
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
            <div className="relative">
              <input
                id="coupon"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Digite seu cupom"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-10 text-white placeholder-white/30 outline-none transition-colors focus:border-brand-pink"
              />
              {checkingCoupon && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-pink border-t-transparent" />
                </div>
              )}
            </div>
            {couponStatus && (
              <p className={`mt-2 text-sm ${couponStatus.valid ? 'text-brand-pink' : 'text-red-400'}`}>
                {couponStatus.message}
              </p>
            )}
          </div>

          {tab === 'pix' && (
            <>
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-white/5 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-pink/20">
                  <span className="text-lg font-bold text-brand-pink">PIX</span>
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
                className="touch-target block w-full rounded-full bg-[#FEA7EC] px-8 py-5 text-center font-century font-bold text-white transition-all duration-300 hover:scale-[1.02] shadow-pink disabled:cursor-not-allowed disabled:opacity-60"
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
                <div className="mb-4 rounded-xl bg-brand-pink/10 p-3 text-center text-sm text-brand-pink">
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
