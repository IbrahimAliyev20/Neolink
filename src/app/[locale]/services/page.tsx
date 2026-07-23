import { HeroSection } from "@/components/services/hero-section";
import { GridSection } from "@/components/services/grid-section";

export default function ServicePage() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-12 items-center pb-[90px] pt-12 w-full">
      <HeroSection />
      <GridSection />
    </div>
  );
}
