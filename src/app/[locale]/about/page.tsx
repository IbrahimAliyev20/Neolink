import { OverviewSection } from "@/components/about/overview-section";
import { HowWeWorkSection } from "@/components/about/how-we-work-section";
import { TestimonialsSection } from "@/components/about/testimonials-section";
import { EcosystemSection } from "@/components/shared/ecosystem-section";
import { JoinUsSection } from "@/components/about/join-us-section";

export default function AboutPage() {
  return (
    <>
      <OverviewSection />
      <HowWeWorkSection />
      <TestimonialsSection />
      <EcosystemSection />
      <JoinUsSection />
    </>
  );
}
