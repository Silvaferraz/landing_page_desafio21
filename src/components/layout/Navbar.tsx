'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import CTAButton from '@/components/ui/CTAButton'
import { siteConfig } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Home', href: '/#hero' },
  { label: 'Especialistas', href: '/#especialistas' },
  { label: 'Cronograma', href: '/#cronograma' },
  { label: 'Para Quem É', href: '/#para-quem-e' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
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

  // Focus trap when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return

    const menu = menuRef.current
    if (!menu) return

    const focusable = menu.querySelectorAll<HTMLElement>(
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

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }

    menu.addEventListener('keydown', handleTab)
    document.addEventListener('keydown', handleEsc)
    return () => {
      menu.removeEventListener('keydown', handleTab)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [menuOpen])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-40 bg-dark-blue backdrop-blur-glass transition-all duration-300 ${
        scrolled ? 'border-b border-white/10' : ''
      }`}
    >
      <Container className="flex items-center justify-between py-4">
        <a href="/" className="flex shrink-0 items-center">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={160}
            height={80}
            className="h-9 w-auto md:h-10 lg:h-20"
            sizes="(max-width: 768px) 160px, 320px"
            priority
            fetchPriority="high"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-century text-sm text-white/80 transition-colors hover:text-neon-green focus-visible:outline-2 focus-visible:outline-neon-green"
            >
              {link.label}
            </a>
          ))}
          <div data-cta="navbar-cta" data-cta-label="navbar-cta" data-cta-whatsapp="true">
            <CTAButton href="/inscricao" size="small">
              Quero Participar
            </CTAButton>
          </div>
        </nav>

        <button
          ref={hamburgerRef}
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
        <div ref={menuRef} className="border-t border-white/10 bg-dark-blue/95 backdrop-blur-glass md:hidden">
          <Container className="flex flex-col gap-4 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 font-century text-base text-white/80 transition-colors hover:text-neon-green focus-visible:outline-2 focus-visible:outline-neon-green"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div data-cta="navbar-cta-mobile" data-cta-label="navbar-cta-mobile" data-cta-whatsapp="true" className="mt-2 w-full">
              <CTAButton href="/inscricao" className="w-full">
                Quero Participar
              </CTAButton>
            </div>
          </Container>
        </div>
      )}

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-neon-green transition-all duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </header>
  )
}
