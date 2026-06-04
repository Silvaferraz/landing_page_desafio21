import Container from '@/components/ui/Container'
import CookiePreferencesButton from '@/components/lgpd/CookiePreferencesButton'
import { siteConfig, specialists } from '@/lib/constants'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  const selena = specialists[0]

  return (
    <footer className="border-t border-white/10 bg-dark-blue py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <span className="font-aileron text-2xl font-black text-white">
            <Image src="/images/logo6.webp" alt="Logo do Footer" width={200} height={200} loading="lazy" />
          </span>

          <nav className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
            <a
              href="/politica-de-privacidade"
              className="font-century text-sm text-white/60 transition-colors hover:text-sky-blue focus-visible:outline-2 focus-visible:outline-neon-green"
            >
              Politica de Privacidade
            </a>
            <a
              href="/termos-de-uso"
              className="font-century text-sm text-white/60 transition-colors hover:text-sky-blue focus-visible:outline-2 focus-visible:outline-neon-green"
            >
              Termos de Uso
            </a>
            <CookiePreferencesButton />
          </nav>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4 md:justify-start ms-0 md:ms-12">
          <a
            href={selena.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-neon-green"
            aria-label="Instagram Selena Rossi"
          >
            <Image src="/images/instagram.webp" alt="" width={28} height={28} className="" loading="lazy" />
          </a>
          <a
            href={selena.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-neon-green"
            aria-label="WhatsApp Selena Rossi"
          >
            <Image src="/images/whatsapp.webp" alt="" width={32} height={32} className="" loading="lazy" />
          </a>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="font-century text-sm text-white/40">
            &copy; {year} {siteConfig.responsible}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
