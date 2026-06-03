'use client'

import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookieBanner() {
  const { consent, acceptAll, rejectAll, openModal } = useCookieConsent()

  if (consent.status !== 'pending') return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-dark-blue/95 backdrop-blur-glass p-4 md:p-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="body-text text-sm md:text-base">
          Utilizamos cookies para melhorar sua experiencia. Ao continuar, voce
          concorda com nossa{' '}
          <a
             href="/politica-de-privacidade"
            className="underline hover:text-neon-green focus-visible:outline-2 focus-visible:outline-neon-green"
          >
            Politica de Privacidade
          </a>
          .
        </p>
        <div className="flex shrink-0 flex-wrap gap-3">
          <button
            onClick={acceptAll}
            className="touch-target rounded-full bg-neon-green px-6 py-2 font-century font-bold text-dark-blue transition-all hover:scale-105 hover:shadow-neon focus-visible:outline-2 focus-visible:outline-neon-green"
          >
            Aceitar Todos
          </button>
          <button
            onClick={rejectAll}
            className="touch-target rounded-full border border-white/20 px-6 py-2 font-century text-sm text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-neon-green"
          >
            Recusar
          </button>
          <button
            onClick={openModal}
            className="touch-target rounded-full border border-white/20 px-6 py-2 font-century text-sm text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-neon-green"
          >
            Personalizar
          </button>
        </div>
      </div>
    </div>
  )
}
