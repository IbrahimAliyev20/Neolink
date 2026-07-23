import { HeroSection } from "@/components/about/hero-section";
import { FeatureSection } from "@/components/about/feature-section";
import { StatsSection } from "@/components/about/stats-section";

export function OverviewSection() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-16 items-start pb-[90px] pt-16 w-full">
      <HeroSection />
      <div className="flex flex-col gap-5 items-start w-full">
        <FeatureSection />
        <StatsSection />
      </div>
    </div>
  );
}
