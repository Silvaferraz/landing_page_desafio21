import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyCTA from '@/components/ui/StickyCTA'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <StickyCTA />
    </>
  )
}
