import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import {
  CookieConsentProvider,
  ConsentAnalyticsGate,
} from '@/context/CookieConsentContext'
import CookieBanner from '@/components/lgpd/CookieBanner'
import CookieModal from '@/components/lgpd/CookieModal'
import { siteConfig } from '@/lib/constants'
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

const siteUrl = siteConfig.domain
const siteName = 'Desafio 21 dias por você'
const siteDescription =
  'Transforme sua saude com acompanhamento especializado. Programa intensivo de 3 semanas para mulheres que desejam recuperar o controle da saúde com resultados reais.'
const ogImage = `${siteUrl}/images/logo1.webp`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Transforme Sua Saude em 12 Semanas`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'saude feminina',
    'emagrecimento saudavel',
    'equilibrio hormonal',
    'desafio saude',
    'acompanhamento nutricional',
    'transformacao feminina',
    'programa de saude para mulheres',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
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
      <head>
        {/* [ANALYTICS DESATIVADO]
        {process.env.NODE_ENV === 'production' && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://connect.facebook.net" />
            <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
            <link rel="dns-prefetch" href="https://connect.facebook.net" />
          </>
        )}
        */}
      </head>
      <body
        className={`${aileron.variable} ${centuryGothic.variable} bg-dark-blue text-white antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-neon-green focus:px-4 focus:py-2 focus:text-dark-blue"
        >
          Pular para o conteudo
        </a>

        {/* JSON-LD — Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: siteName,
                  url: siteUrl,
                  logo: `${siteUrl}/favicon.svg`,
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  url: siteUrl,
                  name: siteName,
                  description: siteDescription,
                  publisher: { '@id': `${siteUrl}/#organization` },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${siteUrl}/#localbusiness`,
                  name: siteName,
                  url: siteUrl,
                  description: siteDescription,
                  image: ogImage,
                  telephone: '+5555999501617',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Brasil',
                    addressCountry: 'BR',
                  },
                  priceRange: '$$',
                },
              ],
            }),
          }}
        />

        <CookieConsentProvider>
          <main id="main-content">{children}</main>

          <ConsentAnalyticsGate />
          <CookieBanner />
          <CookieModal />
        </CookieConsentProvider>
      </body>
    </html>
  )
}
