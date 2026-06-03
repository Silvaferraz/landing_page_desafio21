import Container from '@/components/ui/Container'
import CookiePreferencesButton from '@/components/lgpd/CookiePreferencesButton'
import { siteConfig } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-dark-blue py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <span className="font-aileron text-2xl font-black text-white">
            {siteConfig.name}
          </span>

          <nav className="flex flex-wrap items-center gap-6">
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

        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="font-century text-sm text-white/40">
            &copy; {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  )
}
