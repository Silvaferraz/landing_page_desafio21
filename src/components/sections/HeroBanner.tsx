import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ctaConfig } from '@/lib/constants'

export default function HeroBanner() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white"
    >
      {/* Decorative background — crossing blue lines (transparent PNG) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <img
          src="/images/hero-bg-lines.webp"
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 pt-24 md:gap-14 lg:gap-16">
        <AnimatedSection variant="fade-up" delay={0.1} className="flex justify-center">
          <Image
            src="/images/logo1.webp"
            alt="Mulher saudável e confiante"
            width={500}
            height={667}
            className="h-auto w-[600px] object-contain md:w-[600px] lg:w-[800px]"
            priority
          />
        </AnimatedSection>

        <AnimatedSection variant="fade-up" delay={0.3} className="flex flex-wrap justify-center gap-4">
          <div data-cta="hero-cta-principal" data-cta-label="hero-cta-principal" data-cta-whatsapp="true">
            <CTAButton href={ctaConfig.whatsappLink} variant="primary" size="large">
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
