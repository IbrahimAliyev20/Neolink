import { getPageMetadata } from "@/services/meta-tag/api";
import { HeroSection } from "@/components/contact/hero-section";
import { MapSection } from "@/components/contact/map-section";

export function generateMetadata() {
  return getPageMetadata("Contact");
}

export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <MapSection />
    </>
  );
}
