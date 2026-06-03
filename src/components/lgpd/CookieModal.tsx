'use client'

import { useEffect, useRef, useState } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'

export default function CookieModal() {
  const { consent, isModalOpen, closeModal, savePreferences } =
    useCookieConsent()
  const [analytics, setAnalytics] = useState(consent.analytics)
  const [marketing, setMarketing] = useState(consent.marketing)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isModalOpen) {
      setAnalytics(consent.analytics)
      setMarketing(consent.marketing)
    }
  }, [isModalOpen, consent.analytics, consent.marketing])

  useEffect(() => {
    if (!isModalOpen) return
    const dialog = dialogRef.current
    if (!dialog) return

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    first?.focus()

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    dialog.addEventListener('keydown', handleTab)
    return () => dialog.removeEventListener('keydown', handleTab)
  }, [isModalOpen])

  useEffect(() => {
    if (!isModalOpen) return
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isModalOpen, closeModal])

  if (!isModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Preferencias de cookies"
        className="glass w-full max-w-md rounded-2xl p-6 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="heading-3">Preferencias de Cookies</h2>
          <button
            onClick={closeModal}
            className="touch-target rounded-full text-white/60 hover:text-white focus-visible:outline-2 focus-visible:outline-neon-green"
            aria-label="Fechar"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="body-text mb-6 text-sm">
          Personalize suas preferencias de cookies. Cookies necessarios sao
          sempre ativos para o funcionamento do site.
        </p>

        <div className="mb-6 space-y-4">
          {/* Necessarios — sempre ativo */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
            <div>
              <span className="font-century font-bold text-white">
                Necessarios
              </span>
              <p className="text-xs text-white/60">Sempre ativos</p>
            </div>
            <div className="h-6 w-10 rounded-full bg-white/20 opacity-50" />
          </div>

          {/* Analytics */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
            <div>
              <span className="font-century font-bold text-white">
                Analytics
              </span>
              <p className="text-xs text-white/60">Google Analytics e GTM</p>
            </div>
            <button
              role="switch"
              aria-checked={analytics}
              aria-label="Cookies de analytics"
              onClick={() => setAnalytics(!analytics)}
              className={`relative h-6 w-10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-neon-green ${
                analytics ? 'bg-neon-green' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-dark-blue transition-transform ${
                  analytics ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Marketing */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
            <div>
              <span className="font-century font-bold text-white">
                Marketing
              </span>
              <p className="text-xs text-white/60">Meta Pixel e campanhas</p>
            </div>
            <button
              role="switch"
              aria-checked={marketing}
              aria-label="Cookies de marketing"
              onClick={() => setMarketing(!marketing)}
              className={`relative h-6 w-10 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-neon-green ${
                marketing ? 'bg-neon-green' : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-dark-blue transition-transform ${
                  marketing ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={() => savePreferences(analytics, marketing)}
          className="touch-target w-full rounded-full bg-neon-green px-8 py-3 font-century font-bold text-dark-blue transition-all hover:scale-[1.02] hover:shadow-neon focus-visible:outline-2 focus-visible:outline-neon-green"
        >
          Salvar Preferencias
        </button>
      </div>
    </div>
  )
}
