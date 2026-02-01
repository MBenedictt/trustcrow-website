import LandingNavbar from "@/components/landing-nav";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Step from "@/components/landing/step";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <Hero />
      <Features />
      <Step />


    </div>
  )
}
