'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

const THRESHOLDS = [25, 50, 75, 100]

export default function ScrollTracker() {
  const tracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return

      const percent = Math.round((scrollTop / docHeight) * 100)

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !tracked.current.has(threshold)) {
          tracked.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
