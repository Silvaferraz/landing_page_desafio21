import Image from 'next/image'
import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import StaggerContainer from '@/components/ui/StaggerContainer'
import StaggerItem from '@/components/ui/StaggerItem'
import { forWhoData, type ForWhoItem } from '@/lib/constants'


function ForWhoCard({
  item,
  index,
}: {
  item: ForWhoItem
  index: number
}) {
  return (
      <GlassCard className="flex items-start gap-4 md:gap-5 bg-white">
      <Image src={item.icon} width={50} height={50} alt={item.title} loading="lazy" />
      <div className="flex flex-col gap-1.5">
        <h3 className="heading-4 text-deep-blue/90">{item.title}</h3>
        <p className="body-text text-deep-blue/90">{item.description}</p>
      </div>
    </GlassCard>
  )
}

export default function ForWhoSection() {
  return (
    <section
      id="para-quem-e"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-sky-blue/10 blur-[120px] md:h-[500px] md:w-[500px]" />
      <div className="pointer-events-none absolute -bottom-1/4 right-0 h-[200px] w-[200px] rounded-full bg-deep-blue/20 blur-[100px] md:h-[400px] md:w-[400px]" />

      <Container className="relative z-10">
        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <Badge variant="accent" className="mb-4 inline-block">
              PARA QUEM É
            </Badge>
            <h2 className="heading-2 mb-4">
              Este desafio é para você
            </h2>
            <p className="body-text text-white/90">
              Mulher que acha que não tem tempo para treinar e que não tem o acompanhamento necessário para alcançar seus objetivos.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <AnimatedSection variant="fade-left" delay={0.2}>
            <div className="relative mx-auto aspect-[5/6] w-full max-w-[400px] md:mx-0 md:max-w-none">
              <div className="absolute -inset-4 rounded-full bg-gradient-hero opacity-30 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src="/images/selenaRossi.webp"
                  alt="Mulheres que o desafio atende"
                  fill
                  className="object-cover"
                  sizes="(max-width: 508px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </AnimatedSection>

          <StaggerContainer className="flex flex-col gap-4 md:gap-5">
            {forWhoData.map((item, index) => (
              <StaggerItem key={item.id}>
                <ForWhoCard item={item} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}
