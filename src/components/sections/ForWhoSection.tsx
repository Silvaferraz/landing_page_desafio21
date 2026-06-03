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
    <GlassCard className="flex items-start gap-4 md:gap-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-blue to-deep-blue font-aileron font-black text-lg text-white shadow-lg shadow-sky-blue/30">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="heading-4">{item.title}</h3>
        <p className="body-text text-white/90">{item.description}</p>
      </div>
    </GlassCard>
  )
}

export default function ForWhoSection() {
  return (
    <section
      id="para-quem-e"
      className="relative overflow-hidden bg-gradient-section py-16 md:py-24"
    >
      <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-sky-blue/10 blur-[120px] md:h-[500px] md:w-[500px]" />
      <div className="pointer-events-none absolute -bottom-1/4 right-0 h-[200px] w-[200px] rounded-full bg-deep-blue/20 blur-[100px] md:h-[400px] md:w-[400px]" />

      <Container className="relative z-10">
        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <Badge variant="accent" className="mb-4 inline-block">
              PARA QUEM E
            </Badge>
            <h2 className="heading-2 mb-4">
              Este Desafio e para Voce
            </h2>
            <p className="body-text text-white/90">
              Se voce se identifica com algum dos perfis abaixo, o programa foi
              criado pensando em voce e nas suas necessidades.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <AnimatedSection variant="fade-left" delay={0.2}>
            <div className="relative mx-auto aspect-[5/6] w-full max-w-[400px] md:mx-0 md:max-w-none">
              <div className="absolute -inset-4 rounded-full bg-gradient-hero opacity-30 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/5">
                <Image
                  src="/images/for-who.svg"
                  alt="Mulheres que o desafio atende"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
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
