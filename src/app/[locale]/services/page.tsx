import { getPageMetadata } from "@/services/meta-tag/api";
import { HeroSection } from "@/components/services/hero-section";
import { GridSection } from "@/components/services/grid-section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata("Service", locale);
}

export default function ServicePage() {
  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-8 items-center pb-12 pt-8 w-full lg:gap-12 lg:pb-[90px] lg:pt-12">
      <HeroSection />
      <GridSection />
    </div>
  );
}
