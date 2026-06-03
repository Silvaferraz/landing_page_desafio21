import Image from 'next/image'
import Container from '@/components/ui/Container'
import CTAButton from '@/components/ui/CTAButton'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'

const AVATAR_COUNT = 4

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-dark-blue"
    >
      {/* LAYER 1 — Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" />

      {/* LAYER 2 — Decorative giant background text */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center">
        <span className="text-[clamp(10rem,25vw,28rem)] font-aileron font-black leading-none text-white/[0.03]">
          SAÚDE
        </span>
      </div>

      {/* LAYER 3 — Atmospheric glow orbs */}
      <div className="pointer-events-none absolute -top-1/4 right-0 h-[300px] w-[300px] rounded-full bg-sky-blue/20 blur-[120px] md:h-[600px] md:w-[600px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[200px] w-[200px] rounded-full bg-deep-blue/30 blur-[100px] md:h-[400px] md:w-[400px]" />

      {/* LAYER 4 — Content + LAYER 5 — Image */}
      <Container className="relative z-10 flex min-h-screen items-center">
        <div className="grid w-full items-center gap-12 pt-24 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* ---- Content column ---- */}
          <div className="relative flex flex-col gap-6 md:gap-8">
            {/* Contrast overlay — ensures body-text meets WCAG AA on gradient */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-b from-transparent via-dark-blue/[0.12] to-dark-blue/[0.22]" />
            <AnimatedSection variant="fade-up" delay={0.1}>
              <Badge variant="accent">VAGAS LIMITADAS</Badge>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={0.2}>
              <h1 className="heading-1">
                Transforme Sua Saúde com Quem Entende do Assunto
              </h1>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={0.3}>
              <p className="body-text text-white max-w-lg">
                Um programa intensivo de 12 semanas para mulheres que desejam
                recuperar o controle da sua saúde com acompanhamento
                especializado e resultados reais.
              </p>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <div data-cta="hero-cta-principal" data-cta-label="hero-cta-principal" data-cta-whatsapp="true">
                  <CTAButton href="#" variant="primary" size="large">
                    Quero Participar
                  </CTAButton>
                </div>
                <div data-cta="hero-cta-secundario" data-cta-label="hero-cta-secundario">
                  <CTAButton href="#especialistas" variant="outline" size="large">
                    Saiba Mais
                  </CTAButton>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fade-up" delay={0.5}>
              <div className="glass flex w-fit items-center gap-3 rounded-full px-6 py-3">
                <div className="flex -space-x-2" aria-hidden="true">
                  {Array.from({ length: AVATAR_COUNT }, (_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-dark-blue bg-sky-blue/30"
                    />
                  ))}
                </div>
                <span className="body-text text-sm text-white">
                  +500 mulheres transformadas
                </span>
              </div>
            </AnimatedSection>
          </div>

          {/* ---- Image column ---- */}
          <AnimatedSection
            variant="fade-right"
            delay={0.3}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-[3/4] w-full max-w-[400px] lg:max-w-[500px]">
              <div className="absolute -inset-4 opacity-40"><div className="h-full w-full rounded-full bg-gradient-hero blur-2xl" /></div>
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src="/images/hero-person.svg"
                  alt="Mulher saudável e confiante"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
