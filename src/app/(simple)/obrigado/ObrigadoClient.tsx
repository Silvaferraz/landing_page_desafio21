'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { ctaConfig } from '@/lib/constants'

export default function ObrigadoClient() {
  useEffect(() => {
    const usedCoupon = localStorage.getItem('usedCoupon')
    if (usedCoupon) {
      fetch('/api/use-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: usedCoupon }),
      }).finally(() => {
        localStorage.removeItem('usedCoupon')
      })
    }
  }, [])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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

      <div className="relative z-10 flex w-full flex-col items-center px-6 py-20">
        <div className="w-full max-w-lg">
          <div className="glass rounded-3xl p-8 text-center md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-neon-green/20">
              <svg
                className="h-10 w-10 text-neon-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>

            <h1 className="heading-1 mb-4">
              Pagamento Confirmado!
            </h1>
            <p className="body-text mb-8">
              Parabéns! Sua inscrição no <strong>Desafio 21 Dias por Você</strong> foi confirmada.
              Agora entre no grupo exclusivo do WhatsApp para não perder nada.
            </p>

            <a
              href={ctaConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target inline-flex items-center justify-center gap-3 rounded-full bg-gradient-cta px-10 py-5 text-center font-century font-bold text-white transition-all duration-300 hover:scale-105 shadow-neon"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Entrar no Grupo Exclusivo
            </a>

            <p className="mt-6 text-sm text-white/50">
              Após entrar no grupo, você terá acesso a todo o conteúdo do desafio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
