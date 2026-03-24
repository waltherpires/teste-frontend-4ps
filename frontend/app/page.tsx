import { Header } from "@/src/components/landpage/header";
import { HeroSection } from "@/src/components/landpage/hero-section";
import { ProblemSolution } from "@/src/components/landpage/problem-solution";
import { JourneyTimeline } from "@/src/components/landpage/journey-timeline";
import { BenefitsCards } from "@/src/components/landpage/benefits-cards";
import { FinalCTA } from "@/src/components/landpage/final-cta";
import { Footer } from "@/src/components/landpage/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSolution />
      <JourneyTimeline />
      <BenefitsCards />
      <FinalCTA />
      <Footer />
    </main>
  );
}