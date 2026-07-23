import { HeroSection } from "@/components/about/hero-section";
import { FeatureSection } from "@/components/about/feature-section";
import { StatsSection } from "@/components/about/stats-section";

export function OverviewSection() {
  return (
    <div className="flex flex-col gap-5 items-start pb-9 pt-9 w-full lg:gap-16 lg:pb-[90px] lg:pt-16">
      <HeroSection />
      <div className="flex flex-col gap-5 items-start w-full">
        <FeatureSection />
        <StatsSection />
      </div>
    </div>
  );
}
