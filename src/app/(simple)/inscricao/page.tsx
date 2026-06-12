import type { Metadata } from 'next'
import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'
import BackButton from '@/components/ui/BackButton'

export const metadata: Metadata = {
  title: 'Inscricao | Desafio 21 dias por voce',
  description:
    'Assista ao video e descubra como transformar sua saude em apenas 21 dias.',
}

export default function InscricaoPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <BackButton />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg-lines1.webp"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-6 pt-20 md:pt-24">
        <div className="w-full max-w-3xl">
          <div className="glass rounded-3xl p-6 md:p-10">
            <h1 className="heading-1 mb-4 text-center">
              Entenda o Desafio 21 Dias por Você
            </h1>
            <p className="body-text mb-8 text-center">
              Assista ao vídeo abaixo para entender como funciona o programa e
              transforme sua saúde com acompanhamento especializado.
            </p>

            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-dark-blue/50 shadow-blue">
              <iframe
                src="https://www.youtube.com/embed/XXXXXXX"
                title="Desafio 21 dias - Explicação"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <div className="mt-10 text-center">
              <p className="body-text mb-6 text-lg font-bold text-white">
                Pronta para começar sua transformação?
              </p>
              <CTAButton
                href="/checkout"
                variant="primary"
                size="large"
                className="px-16 py-6 text-xl"
              >
                Me Inscrever
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
