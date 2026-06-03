import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const aileron = localFont({
  src: [
    {
      path: '../fonts/aileron-heavy.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-aileron',
  display: 'swap',
  preload: true,
})

const centuryGothic = localFont({
  src: [
    {
      path: '../fonts/century-gothic.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/century-gothic-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-century',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com.br'),
  title: {
    default: '[Nome do Desafio] | [Beneficio Principal] para Mulheres',
    template: '%s | [Nome do Desafio]',
  },
  description:
    '[Descricao de 150-160 caracteres com keyword principal e beneficio claro]',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B008A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${aileron.variable} ${centuryGothic.variable} bg-dark-blue text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-neon-green focus:px-4 focus:py-2 focus:text-dark-blue"
        >
          Pular para o conteudo
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
