import { HeroSection } from "@/components/services/hero-section";
import { GridSection } from "@/components/services/grid-section";

export default function ServicePage() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-8 items-center pb-12 pt-8 w-full lg:gap-12 lg:pb-[90px] lg:pt-12">
      <HeroSection />
      <GridSection />
    </div>
  );
}
