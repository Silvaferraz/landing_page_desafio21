'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StaggerContainer from '@/components/ui/StaggerContainer'
import StaggerItem from '@/components/ui/StaggerItem'
import { timelineData, type TimelineItem } from '@/lib/constants'

function TimelineRow({
  item,
  index,
}: {
  item: TimelineItem
  index: number
}) {
  const isEven = index % 2 === 0

  const card = (
    <GlassCard className="w-full">
      <div className="flex flex-col gap-3">
        <Badge variant="primary">{item.week}</Badge>
        <h3 className="heading-4">{item.title}</h3>
        <p className="body-text text-white/90">{item.description}</p>
      </div>
    </GlassCard>
  )

  return (
    <>
      {/* Mobile layout */}
      <div className="flex gap-4 md:hidden">
        <div className="flex w-[24px] shrink-0 justify-center pt-2">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="relative z-10 h-4 w-4 rounded-full bg-sky-blue ring-4 ring-dark-blue shadow-lg shadow-sky-blue/30"
          />
        </div>
        <div className="flex-1">{card}</div>
      </div>

      {/* Desktop layout */}
      <div className="hidden gap-8 md:grid md:grid-cols-[1fr_auto_1fr] md:items-start">
        {isEven ? (
          <>
            <div className="pr-4 lg:pr-8">
              <div className="ml-auto max-w-md">{card}</div>
            </div>
            <div className="flex justify-center pt-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
                className="relative z-10 h-4 w-4 rounded-full bg-sky-blue ring-4 ring-dark-blue shadow-lg shadow-sky-blue/30"
              />
            </div>
            <div />
          </>
        ) : (
          <>
            <div />
            <div className="flex justify-center pt-2">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                }}
                className="relative z-10 h-4 w-4 rounded-full bg-sky-blue ring-4 ring-dark-blue shadow-lg shadow-sky-blue/30"
              />
            </div>
            <div className="pl-4 lg:pl-8">
              <div className="max-w-md">{card}</div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default function TimelineSection() {
  const itemsRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: itemsRef,
    offset: ['start end', 'end start'],
  })

  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  return (
    <section
      id="cronograma"
      className="relative overflow-hidden bg-gradient-section py-16 md:py-24"
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -right-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-sky-blue/10 blur-[120px] md:h-[500px] md:w-[500px]" />
      <div className="pointer-events-none absolute -bottom-1/4 left-0 h-[250px] w-[250px] rounded-full bg-deep-blue/20 blur-[100px] md:h-[400px] md:w-[400px]" />

      <Container className="relative z-10">
        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <Badge variant="accent" className="mb-4 inline-block">
              SUA JORNADA
            </Badge>
            <h2 className="heading-2 mb-4">
              Como Funciona o Programa
            </h2>
            <p className="body-text text-white/90">
              Um cronograma estruturado em 12 semanas, dividido em etapas
              progressivas para garantir resultados seguros e duradouros.
            </p>
          </div>
        </AnimatedSection>

        <div ref={itemsRef} className="relative mt-12 md:mt-16">
          {/* Animated timeline line */}
          <div className="absolute bottom-0 left-[12px] top-0 w-[2px] md:left-1/2 md:-translate-x-px">
            <div className="absolute inset-0 rounded-full bg-white/10" />
            <motion.div
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-sky-blue to-neon-green"
              style={{ scaleY: lineScale }}
            />
          </div>

          <StaggerContainer className="flex flex-col gap-12 md:gap-16">
            {timelineData.map((item, index) => (
              <StaggerItem key={item.id}>
                <TimelineRow item={item} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
