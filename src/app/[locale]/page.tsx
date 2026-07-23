import { BlogSection } from "@/components/home/blog-section";
import { FaqSection } from "@/components/home/faq-section";
import { HeroSection } from "@/components/home/hero-section";
import { PartnersSection } from "@/components/home/partners-section";
import { ServicesSection } from "@/components/home/services-section";
import { WhyUsSection } from "@/components/home/why-us-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <BlogSection />
      <FaqSection />
      <PartnersSection />
    </main>
  );
}
