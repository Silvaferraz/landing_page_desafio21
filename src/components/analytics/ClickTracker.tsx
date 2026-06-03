'use client'

import { useEffect } from 'react'
import { trackCTA, trackWhatsApp } from '@/lib/analytics'

export default function ClickTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cta]')
      if (!el) return

      const label = el.getAttribute('data-cta-label') ?? ''
      const isWhatsApp = el.getAttribute('data-cta-whatsapp') === 'true'

      if (isWhatsApp) {
        trackWhatsApp(label)
      } else {
        trackCTA(label)
      }
    }

    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return null
}
