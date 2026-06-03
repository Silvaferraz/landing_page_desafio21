'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/ui/Container'
import CTAButton from '@/components/ui/CTAButton'
import { siteConfig } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Especialistas', href: '#especialistas' },
  { label: 'Cronograma', href: '#cronograma' },
  { label: 'Para Quem É', href: '#para-quem-e' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-dark-blue/80 shadow-glass backdrop-blur-glass'
          : 'bg-transparent'
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <a
          href="#hero"
          className="font-aileron text-2xl font-black text-white"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-century text-sm text-white/80 transition-colors hover:text-neon-green"
            >
              {link.label}
            </a>
          ))}
          <div data-cta="navbar-cta" data-cta-label="navbar-cta" data-cta-whatsapp="true">
            <CTAButton href="#" size="small">
              Quero Participar
            </CTAButton>
          </div>
        </nav>

        <button
          className="touch-target md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <div className="relative flex h-5 w-6 flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-white transition-transform ${
                menuOpen ? 'translate-y-[9px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-opacity ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-transform ${
                menuOpen ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </Container>

      {menuOpen && (
        <div className="border-t border-white/10 bg-dark-blue/95 backdrop-blur-glass md:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 font-century text-base text-white/80 transition-colors hover:text-neon-green"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div data-cta="navbar-cta-mobile" data-cta-label="navbar-cta-mobile" data-cta-whatsapp="true" className="mt-2 w-full">
              <CTAButton href="#" className="w-full">
                Quero Participar
              </CTAButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
