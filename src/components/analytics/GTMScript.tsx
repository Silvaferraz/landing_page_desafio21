'use client'

import { GoogleAnalytics } from '@next/third-parties/google'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? 'G-TSG8PZT1FM'

interface GAScriptProps {
  consent: boolean
}

export default function GAScript({ consent }: GAScriptProps) {
  if (!consent) return null
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
}
