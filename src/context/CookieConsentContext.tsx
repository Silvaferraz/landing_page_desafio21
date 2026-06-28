'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
// import { setConsentChecker, setMarketingConsentChecker, trackPageView } from '@/lib/analytics'
// import GAScript from '@/components/analytics/GTMScript'
// import MetaPixel from '@/components/analytics/MetaPixel'
// import ScrollTracker from '@/components/analytics/ScrollTracker'
// import ClickTracker from '@/components/analytics/ClickTracker'

type ConsentStatus = 'pending' | 'accepted' | 'rejected'

type CookieConsent = {
  status: ConsentStatus
  analytics: boolean
  marketing: boolean
}

interface CookieConsentContextValue {
  consent: CookieConsent
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (analytics: boolean, marketing: boolean) => void
  openModal: () => void
  closeModal: () => void
  isModalOpen: boolean
}

const STORAGE_KEY = 'cookie-consent'

const defaultConsent: CookieConsent = {
  status: 'pending',
  analytics: false,
  marketing: false,
}

function isValidConsent(data: unknown): data is CookieConsent {
  if (!data || typeof data !== 'object') return false
  const obj = data as Record<string, unknown>
  return (
    (obj.status === 'pending' || obj.status === 'accepted' || obj.status === 'rejected') &&
    typeof obj.analytics === 'boolean' &&
    typeof obj.marketing === 'boolean'
  )
}

function loadConsent(): CookieConsent {
  if (typeof window === 'undefined') return defaultConsent
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (isValidConsent(parsed)) return parsed
    }
  } catch {
    /* ignore */
  }
  return defaultConsent
}

function saveConsent(consent: CookieConsent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    /* ignore */
  }
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(defaultConsent)
  const [isModalOpen, setModalOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = loadConsent()
    setConsent(saved)
    setHydrated(true)
  }, [])

  // useEffect(() => {
  //   if (!hydrated) return
  //   setConsentChecker(() => consent.analytics)
  //   setMarketingConsentChecker(() => consent.marketing)
  // }, [consent, hydrated])

  const acceptAll = useCallback(() => {
    const next: CookieConsent = {
      status: 'accepted',
      analytics: true,
      marketing: true,
    }
    setConsent(next)
    saveConsent(next)
  }, [])

  const rejectAll = useCallback(() => {
    const next: CookieConsent = {
      status: 'rejected',
      analytics: false,
      marketing: false,
    }
    setConsent(next)
    saveConsent(next)
  }, [])

  const savePreferences = useCallback(
    (analytics: boolean, marketing: boolean) => {
      const next: CookieConsent = {
        status: analytics || marketing ? 'accepted' : 'rejected',
        analytics,
        marketing,
      }
      setConsent(next)
      saveConsent(next)
      setModalOpen(false)
    },
    [],
  )

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        acceptAll,
        rejectAll,
        savePreferences,
        openModal,
        closeModal,
        isModalOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx)
    throw new Error(
      'useCookieConsent must be used within CookieConsentProvider',
    )
  return ctx
}

/** Renderiza analytics components com consentimento do contexto */
export function ConsentAnalyticsGate() {
  // const { consent } = useCookieConsent()
  // const analytics = consent.status !== 'pending' && consent.analytics
  // const marketing = consent.status !== 'pending' && consent.marketing

  // useEffect(() => {
  //   trackPageView()
  // }, [])

  // return (
  //   <>
  //     <GAScript consent={true} />
  //     {marketing && <MetaPixel consent={marketing} />}
  //     {consent.status !== 'pending' && (
  //       <>
  //         <ScrollTracker />
  //         <ClickTracker />
  //       </>
  //     )}
  //   </>
  // )

  return null
}
