import LandingNavbar from "@/components/landing-nav";
import CTA from "@/components/landing/cta";
import { Faqs } from "@/components/landing/faqs";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Step from "@/components/landing/step";
import WhyUs from "@/components/landing/whyus";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <Hero />
      <Features />
      <Step />
      <WhyUs />
      <Faqs />
      <CTA />
      <Footer />
    </div>
  )
}
