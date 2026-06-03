import Image from 'next/image'
import Container from '@/components/ui/Container'
import GlassCard from '@/components/ui/GlassCard'
import Badge from '@/components/ui/Badge'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { specialists, type Specialist } from '@/lib/constants'

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  )
}

function SpecialistCard({
  specialist,
  index,
}: {
  specialist: Specialist
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <AnimatedSection variant="fade-up" delay={index * 0.15}>
      <GlassCard
        className={`flex flex-col gap-6 md:flex-row md:gap-8 lg:gap-12 ${
          isEven ? '' : 'md:flex-row-reverse'
        }`}
      >
        <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden rounded-xl bg-white/5 md:w-[220px] lg:w-[260px]">
          <Image
            src={specialist.image}
            alt={`Foto da ${specialist.name} — ${specialist.specialty}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 260px"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {specialist.badges.map((badge) => (
              <Badge key={badge} variant="primary">
                {badge}
              </Badge>
            ))}
          </div>

          <h3 className="heading-3">{specialist.name}</h3>

          <p className="label-text">{specialist.specialty}</p>

          <p className="body-text text-white/90">{specialist.bio}</p>

          <a
            href={specialist.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 text-sky-blue transition-colors hover:text-neon-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-green focus-visible:ring-offset-2 focus-visible:ring-offset-dark-blue"
            aria-label={`Instagram da ${specialist.name}`}
          >
            <InstagramIcon />
            <span className="font-century text-sm font-bold">
              Seguir no Instagram
            </span>
          </a>
        </div>
      </GlassCard>
    </AnimatedSection>
  )
}

export default function SpecialistsSection() {
  return (
    <section
      id="especialistas"
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-sky-blue/10 blur-[120px] md:h-[600px] md:w-[600px]" />
      <div className="pointer-events-none absolute -bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-deep-blue/20 blur-[100px] md:h-[500px] md:w-[500px]" />

      <Container className="relative z-10">
        <AnimatedSection variant="fade-up" delay={0.1}>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <Badge variant="accent" className="mb-4 inline-block">
              NOSSO TIME
            </Badge>
            <h2 className="heading-2 mb-4">
              Especialistas que Cuidam de Você
            </h2>
            <p className="body-text text-white/90">
              Conheça a equipe multidisciplinar que vai acompanhar sua jornada
              de transformação com ciência, experiência e cuidado
              individualizado.
            </p>
          </div>
        </AnimatedSection>

        <div className="mx-auto flex max-w-4xl flex-col gap-8 md:gap-12">
          {specialists.map((specialist, index) => (
            <SpecialistCard
              key={specialist.id}
              specialist={specialist}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
