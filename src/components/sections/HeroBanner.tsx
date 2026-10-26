import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function HeroBanner() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg-lines.webp"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
          fetchPriority="high"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 pt-24 md:gap-14 lg:gap-16">
        <AnimatedSection variant="fade-up" delay={0.1} className="flex justify-center">
          <div className="relative inline-block">
            <Image
              src="/images/Logo desafio 21 dias_vem verão.png"
              alt="Desafio 21 dias por você — Vem verão!"
              width={1582}
              height={994}
              className="h-auto w-full max-w-[800px] object-contain md:w-[600px] lg:w-[800px]"
              sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1024px) 600px, 800px"
              priority
              fetchPriority="high"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.3} className="flex flex-wrap justify-center gap-4">
          <div data-cta="hero-cta-principal" data-cta-label="hero-cta-principal" data-cta-whatsapp="true">
            <CTAButton href="/checkout" variant="primary" size="large">
              Quero Participar
            </CTAButton>
          </div>
          <div data-cta="hero-cta-secundario" data-cta-label="hero-cta-secundario">
            <CTAButton href="#conteudo" variant="outline" size="large">
              Saiba Mais
            </CTAButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
