'use client'

import { useEffect, useState } from 'react'
import { ctaConfig } from '@/lib/constants'

interface StickyCTAProps {
  href?: string
  label?: string
  className?: string
}

export default function StickyCTA({
  href = ctaConfig.whatsappLink,
  label = 'Quero Participar',
  className = '',
}: StickyCTAProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isExternal = href.startsWith('http')

  return (
    <div
      data-cta="sticky-cta-mobile"
      data-cta-label="sticky-cta-mobile"
      data-cta-whatsapp="true"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}
    >
      <div className="border-t border-white/15 bg-dark-blue/95 px-4 py-3 backdrop-blur-glass">
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="touch-target block w-full rounded-full bg-gradient-cta px-8 py-4 text-center font-century font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-neon"
        >
          {label}
        </a>
      </div>
    </div>
  )
}
