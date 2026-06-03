import HeroBanner from '@/components/sections/HeroBanner'
import HeroSection from '@/components/sections/HeroSection'
import SpecialistsSection from '@/components/sections/SpecialistsSection'
import TimelineSection from '@/components/sections/TimelineSection'
import ForWhoSection from '@/components/sections/ForWhoSection'
import CTASection from '@/components/sections/CTASection'
import SectionsWrapper from '@/components/sections/SectionsWrapper'

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <SectionsWrapper>
        <HeroSection />
        <SpecialistsSection />
        <TimelineSection />
        <ForWhoSection />
        <CTASection />
      </SectionsWrapper>
    </>
  )
}
