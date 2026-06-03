'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import CTAButton from '@/components/ui/CTAButton'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StaggerContainer from '@/components/ui/StaggerContainer'
import StaggerItem from '@/components/ui/StaggerItem'
import { easeOut } from '@/lib/animations'
import { ctaConfig } from '@/lib/constants'

const AVATAR_COUNT = 4
const filledPercent = Math.round(
  (ctaConfig.filledSpots / ctaConfig.totalSpots) * 100,
)

export default function CTASection() {
  return (
    <section
      id="cta"
      data-section="cta"
      className="relative overflow-hidden bg-gradient-section py-16 md:py-24"
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-sky-blue/10 blur-[140px] md:h-[700px] md:w-[700px]" />
      <div className="pointer-events-none absolute -bottom-1/4 right-0 h-[250px] w-[250px] rounded-full bg-deep-blue/20 blur-[100px] md:h-[400px] md:w-[400px]" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <AnimatedSection variant="fade-up" delay={0.1}>
            <Badge variant="accent" className="mb-5 inline-block">
              ULTIMAS VAGAS
            </Badge>
          </AnimatedSection>

          {/* Headline */}
          <AnimatedSection variant="fade-up" delay={0.2}>
            <h2 className="heading-2 mb-4">
              Pronta para Transformar sua Saude?
            </h2>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection variant="fade-up" delay={0.3}>
            <p className="body-text mx-auto mb-2 max-w-xl text-white/90">
              As vagas sao limitadas para garantir atendimento individualizado
              de alta qualidade. Garanta a sua e comece sua jornada de
              transformacao.
            </p>
          </AnimatedSection>

          {/* Vaga bar */}
          <AnimatedSection variant="fade-up" delay={0.35}>
            <div className="glass mx-auto mb-10 mt-8 max-w-md rounded-2xl p-6 md:p-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="label-text text-xs">
                  VAGAS PREENCHIDAS
                </span>
                <span className="font-century text-lg font-bold text-white">
                  {ctaConfig.filledSpots}/{ctaConfig.totalSpots}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-sky-blue to-neon-green"
                  initial={{ width: '0%' }}
                  whileInView={{ width: `${filledPercent}%` }}
                  transition={{ duration: 1.5, ease: easeOut }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* CTA button + social proof */}
          <StaggerContainer className="flex flex-col items-center gap-6">
            {/* CTA principal */}
            <StaggerItem>
              <div
                data-cta="final-cta"
                data-cta-label="quero-garantir-vaga"
                data-cta-whatsapp="true"
                className="inline-block"
              >
                <CTAButton
                  href={ctaConfig.whatsappLink}
                  variant="primary"
                  size="large"
                  className="px-12 py-6 text-xl"
                >
                  Quero Garantir Minha Vaga
                </CTAButton>
              </div>
            </StaggerItem>

            {/* Social proof */}
            <StaggerItem>
              <div className="flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  {Array.from({ length: AVATAR_COUNT }, (_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-dark-blue bg-sky-blue/30"
                    />
                  ))}
                </div>
                <span className="body-text text-sm text-white/80">
                  +500 mulheres ja transformaram suas vidas
                </span>
              </div>
            </StaggerItem>

            {/* Trust badges */}
            <StaggerItem>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="primary">Pagamento Seguro</Badge>
                <Badge variant="primary">Suporte 24h</Badge>
                <Badge variant="primary">7 Dias de Garantia</Badge>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Closing note */}
          <AnimatedSection variant="fade-in" delay={0.9}>
            <p className="mt-12 text-sm text-white/40">
              Ultimas vagas disponiveis. Proximas inscricoes so daqui 3 meses.
            </p>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
