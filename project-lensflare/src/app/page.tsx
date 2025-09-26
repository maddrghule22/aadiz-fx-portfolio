import HeroSection from '@/components/HeroSection'
import FeaturedWork from '@/components/FeaturedWork'
import ServicesSnippet from '@/components/ServicesSnippet'
import TestimonialsSection from '@/components/TestimonialsSection'
import ClientsSection from '@/components/ClientsSection'
import ContactCTA from '@/components/ContactCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <ServicesSnippet />
      <TestimonialsSection />
      <ClientsSection />
      <ContactCTA />
    </>
  )
}