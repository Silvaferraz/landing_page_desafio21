'use client'

import { useEffect } from 'react'

const PIXEL_ID = '1234567890'

interface MetaPixelProps {
  consent: boolean
}

declare global {
  interface Window {
    fbq?: {
      (...args: unknown[]): void
      callMethod?: (...args: unknown[]) => void
      queue?: unknown[][]
      push?: unknown
      loaded?: boolean
      version?: string
    }
  }
}

function initPixelScript() {
  if (window.fbq) return

  window.fbq = (...args: unknown[]) => {
    if (window.fbq?.callMethod) {
      window.fbq.callMethod(...args)
    } else {
      (window.fbq?.queue ?? []).push(args)
    }
  }
  window.fbq.push = window.fbq
  window.fbq.loaded = true
  window.fbq.version = '2.0'
  window.fbq.queue = []

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(script)

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

export default function MetaPixel({ consent }: MetaPixelProps) {
  useEffect(() => {
    if (consent) {
      initPixelScript()
    }
  }, [consent])

  return null
}
