import { getPageMetadata } from "@/services/meta-tag/api";
import { EcosystemSection } from "@/components/shared/ecosystem-section";
import { BlogSection } from "@/components/home/blog-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesSection } from "@/components/home/services-section";
import { WhyUsSection } from "@/components/home/why-us-section";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata("Home", locale);
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <BlogSection />
      <FaqSection />
      <EcosystemSection />
    </main>
  );
} 
