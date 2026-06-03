'use client'

import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookiePreferencesButton() {
  const { openModal } = useCookieConsent()

  return (
    <button
      onClick={openModal}
      className="font-century text-sm text-white/60 transition-colors hover:text-sky-blue focus-visible:outline-2 focus-visible:outline-neon-green"
    >
      Preferencias de Cookies
    </button>
  )
}
