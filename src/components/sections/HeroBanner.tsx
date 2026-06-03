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
      {/* Decorative background — crossing blue lines */}
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
              src="/images/logo1.webp"
              alt="Mulher saudável e confiante"
              width={800}
              height={1067}
              className="h-auto w-[600px] object-contain md:w-[600px] lg:w-[800px]"
              sizes="(max-width: 768px) 600px, 800px"
              priority
              fetchPriority="high"
            />
            <span className="absolute right-2 top-2 rounded-full bg-neon-green px-3 py-1 text-xs font-bold text-white shadow-lg md:right-3 md:top-3 md:px-4 md:py-1.5 md:text-sm lg:right-4 lg:top-4 lg:px-5 lg:py-2 lg:text-base">
              2° Edição
            </span>
          </div>
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
