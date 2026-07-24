import { getPageMetadata } from "@/services/meta-tag/api";
import { HeroSection } from "@/components/contact/hero-section";
import { MapSection } from "@/components/contact/map-section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata("Contact", locale);
}

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <MapSection />
    </>
  );
}
