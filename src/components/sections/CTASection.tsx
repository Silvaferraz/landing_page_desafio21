'use client'

import { useState, useEffect } from 'react'
import Container from '@/components/ui/Container'
import CTAButton from '@/components/ui/CTAButton'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StaggerContainer from '@/components/ui/StaggerContainer'
import StaggerItem from '@/components/ui/StaggerItem'
import { ctaConfig } from '@/lib/constants'
import Image from 'next/image'

const AVATAR_IMAGES = [
  '/images/hero-avatar-1.jpg',
  '/images/hero-avatar-2.jpg',
  '/images/hero-avatar-3.jpg',
]

const CHALLENGE_START = new Date('2026-06-27T23:59:59-03:00')

function getTimeRemaining() {
  const now = new Date()
  const diff = CHALLENGE_START.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CTASection() {
  const [time, setTime] = useState(getTimeRemaining)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="cta"
      data-section="cta"
      className="relative overflow-hidden py-16 md:py-24"
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
              Pronta para Transformar sua Saúde?
            </h2>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection variant="fade-up" delay={0.3}>
            <p className="body-text mx-auto mb-2 max-w-xl text-white/90">
              As vagas são limitadas para garantir atendimento individualizado
              de alta qualidade. Garanta a sua e comece sua jornada de
              transformação.
            </p>
          </AnimatedSection>

          {/* Countdown */}
          <AnimatedSection variant="fade-up" delay={0.35}>
            <div className="glass mx-auto mb-10 mt-8 max-w-md rounded-2xl p-6 md:p-8">
              <span className="label-text mb-4 block text-center text-xs">
                FIM DAS INCRIÇÕES EM:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'DIAS', value: time.days },
                  { label: 'HORAS', value: time.hours },
                  { label: 'MIN', value: time.minutes },
                  { label: 'SEG', value: time.seconds },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <span className="font-aileron text-3xl font-black text-white md:text-4xl">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="label-text mt-1 text-[10px]">
                      {item.label}
                    </span>
                  </div>
                ))}
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
                  href="/inscricao"
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
                <div className="flex -space-x-2" aria-hidden="true">
                  {AVATAR_IMAGES.map((src, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                    >
                      <Image
                        src={src}
                        alt=""
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
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
                <Badge variant="primary">Comunidade ativa</Badge>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Closing note */}
          <AnimatedSection variant="fade-in" delay={0.9}>
            <p className="mt-12 text-sm text-white/40">
              Ultimas vagas disponiveis.
            </p>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  )
}
