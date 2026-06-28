import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Inscrições Encerradas | Desafio 21 dias por você',
  description:
    'As inscrições para o Desafio 21 dias por você foram encerradas. Te aguardamos no próximo desafio!',
  robots: { index: false, follow: false },
}

export default function EncerradasPage() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg-lines.webp"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Image
          src="/images/logo1.webp"
          alt="Desafio 21 dias por você"
          width={240}
          height={120}
          className="mb-8 h-auto w-100 md:w-60 lg:w-72"
          priority
        />

        <h1 className="font-aileron text-[clamp(18px,5vw,48px)] font-black leading-tight text-dark-blue">
          As inscrições foram encerradas
        </h1>

        <p className="font-century mt-4 text-[clamp(14px,3vw,28px)] font-bold text-dark-blue/80">
          Te aguardo no próximo desafio
        </p>
      </div>
    </section>
  )
}
