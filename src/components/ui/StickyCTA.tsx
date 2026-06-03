'use client'

import { useEffect, useState } from 'react'

interface StickyCTAProps {
  href?: string
  label?: string
  className?: string
}

export default function StickyCTA({
  href = '#',
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

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}
    >
      <div className="border-t border-white/15 bg-dark-blue/95 px-4 py-3 backdrop-blur-glass">
        <a href={href} className="btn-cta block w-full text-center">
          {label}
        </a>
      </div>
    </div>
  )
}
