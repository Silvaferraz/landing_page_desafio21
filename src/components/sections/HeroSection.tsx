import Container from '@/components/ui/Container'
import CTAButton from '@/components/ui/CTAButton'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'

const AVATAR_COUNT = 4

export default function HeroSection() {
  return (
    <section id="conteudo" className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      {/* Subtle decorative orbs */}
      <div className="pointer-events-none absolute -left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-sky-blue/10 blur-[100px] md:h-[500px] md:w-[500px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-1/4 h-[250px] w-[250px] rounded-full bg-deep-blue/10 blur-[80px] md:h-[400px] md:w-[400px]" />

      <Container className="relative z-10 flex flex-col items-center text-center">
        <div className="flex max-w-3xl flex-col items-center gap-6 md:gap-8">
          <AnimatedSection variant="fade-up" delay={0.1}>
            <Badge variant="accent">VAGAS LIMITADAS</Badge>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.2}>
            <h1 className="heading-1 text-deep-blue">
              Transforme Sua Saúde com Quem Entende do Assunto
            </h1>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.3}>
            <p className="body-text text-dark-blue/80 max-w-2xl">
              Um programa intensivo de 12 semanas para mulheres que desejam
              recuperar o controle da sua saúde com acompanhamento
              especializado e resultados reais.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.4} className="mt-2">
            <div
              data-cta="hero-cta-principal"
              data-cta-label="hero-cta-principal"
              data-cta-whatsapp="true"
            >
              <CTAButton href="#" variant="primary" size="large">
                Quero Participar
              </CTAButton>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fade-up" delay={0.5}>
            <div className="flex w-fit items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm">
              <div className="flex -space-x-2" aria-hidden="true">
                {Array.from({ length: AVATAR_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-sky-blue/30"
                  />
                ))}
              </div>
              <span className="body-text text-sm text-dark-blue/70">
                +500 mulheres transformadas
              </span>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
