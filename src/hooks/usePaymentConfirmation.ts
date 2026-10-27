'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PENDING_PAYMENT_KEY, parsePendingPayment, paymentFromRecoveryUrl, isFinalPaymentFailure, type PendingPayment } from '@/lib/pendingPayment'

export default function usePaymentConfirmation() {
  const [payment, setPayment] = useState<PendingPayment | null>(null)
  const [message, setMessage] = useState('')
  const [approved, setApproved] = useState(false)
  const [checkVersion, setCheckVersion] = useState(0)
  const [isChecking, setIsChecking] = useState(false)
  const checkRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let restored: PendingPayment | null = null
    try {
      restored = parsePendingPayment(localStorage.getItem(PENDING_PAYMENT_KEY))
    } catch {
      // Payment tracking still works in memory when browser storage is unavailable.
    }
    const fromUrl = paymentFromRecoveryUrl(window.location.href)
    setPayment(fromUrl && fromUrl.id !== restored?.id ? fromUrl : restored)
  }, [])

  const trackPayment = useCallback((pending: PendingPayment, alreadyApproved = false) => {
    setPayment(pending)
    setMessage('')
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('payment_id', String(pending.id))
      window.history.replaceState(window.history.state, '', url.toString())
    } catch { /* Keep tracking even when the embedded browser blocks history changes. */ }
    try {
      localStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(pending))
    } catch {
      // Do not block confirmation because browser storage is unavailable.
    }
    if (alreadyApproved) {
      setApproved(true)
      window.location.replace('/obrigado/')
    }
  }, [])

  const checkNow = useCallback(() => checkRef.current?.(), [])

  useEffect(() => {
    if (!payment || approved) return
    let active = true
    let checking = false
    let finished = false
    let controller: AbortController | null = null
    const check = async () => {
      if (!active || checking || finished) return
      checking = true
      setIsChecking(true)
      controller = new AbortController()
      const timeout = window.setTimeout(() => controller?.abort(), 12000)
      try {
        const res = await fetch(`/api/check-payment?id=${payment.id}`, {
          cache: 'no-store', signal: controller.signal,
        })
        const data = await res.json()
        if (!res.ok || typeof data.status !== 'string') throw new Error('Payment check failed')
        if (!active) return
        if (payment.amount === 0 && typeof data.amount === 'number' && data.amount > 0) {
          setPayment(current => current?.id === payment.id ? { ...current, amount: data.amount } : current)
        }
        if (data.status === 'approved') {
          finished = true
          // Keep the reference until the destination loads, allowing recovery if navigation fails.
          setApproved(true)
          window.location.replace('/obrigado/')
        } else if (isFinalPaymentFailure(data.status)) {
          finished = true
          try { localStorage.removeItem(PENDING_PAYMENT_KEY) } catch { /* Storage is optional. */ }
          try {
            const url = new URL(window.location.href)
            url.searchParams.delete('payment_id')
            window.history.replaceState(window.history.state, '', url.toString())
          } catch { /* Storage and browser history are optional. */ }
          setPayment(null)
          setMessage('Este pagamento foi recusado, cancelado ou devolvido. Confira no seu banco antes de tentar novamente.')
        } else {
          setMessage('')
        }
      } catch {
        if (active) setMessage('Ainda não conseguimos confirmar. Vamos consultar novamente automaticamente. Se você já pagou, não faça outro pagamento.')
      } finally {
        window.clearTimeout(timeout)
        checking = false
        if (active) setIsChecking(false)
      }
    }
    checkRef.current = () => { void check() }
    void check()
    const interval = window.setInterval(() => { void check() }, 3000)
    // Restart the request: a fetch suspended while the bank app was open may still be hung.
    const onReturn = () => setCheckVersion(version => version + 1)
    window.addEventListener('focus', onReturn)
    window.addEventListener('pageshow', onReturn)
    document.addEventListener('visibilitychange', onReturn)
    return () => {
      active = false
      checkRef.current = null
      setIsChecking(false)
      controller?.abort()
      window.clearInterval(interval)
      window.removeEventListener('focus', onReturn)
      window.removeEventListener('pageshow', onReturn)
      document.removeEventListener('visibilitychange', onReturn)
    }
  }, [payment, approved, checkVersion])

  return { payment, trackPayment, message, approved, checkNow, isChecking }
}
