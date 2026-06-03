import localFont from 'next/font/local'
import type { Metadata } from 'next'
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${aileron.variable} ${centuryGothic.variable}`}>
        {children}
      </body>
    </html>
  )
}
