'use client'

import { GoogleTagManager } from '@next/third-parties/google'

const GTM_ID = 'GTM-XXXXXXX'

interface GTMScriptProps {
  consent: boolean
}

export default function GTMScript({ consent }: GTMScriptProps) {
  if (!consent) return null
  return <GoogleTagManager gtmId={GTM_ID} />
}
