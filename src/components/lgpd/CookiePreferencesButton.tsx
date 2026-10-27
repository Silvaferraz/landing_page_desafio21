'use client'

import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookiePreferencesButton() {
  const { openBanner } = useCookieConsent()

  return (
    <button
      onClick={openBanner}
      className="font-century text-sm text-white/60 transition-colors hover:text-sky-blue focus-visible:outline-2 focus-visible:outline-brand-pink"
    >
      Preferencias de Cookies
    </button>
  )
}
