import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { services } from "@/lib/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import type { ServiceSlug } from "@/lib/data/service-details";

export function OtherServices({ currentSlug }: { currentSlug: ServiceSlug }) {
  const otherServices = services.filter((service) => service.slug !== currentSlug).slice(0, 2);

  if (otherServices.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-5 items-center py-9 w-full lg:gap-12 lg:py-[90px]">
      <div className="flex flex-col gap-3 items-center text-center max-w-[343px] px-4 lg:gap-5 lg:max-w-[646px]">
        <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
          Digər Xidmətlərimiz
        </h2>
        <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
          Biznesinizin müxtəlif ehtiyaclarını qarşılamaq üçün təqdim etdiyimiz əlavə
          xidmətlərlə tanış olun.
        </p>
      </div>

      <Container className="flex flex-col items-start w-full">
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-6 items-start w-full">
          {otherServices.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="contents">
              <ServiceCard {...service} />
            </Link>
          ))}
        </div>
      </Container>

      <Link href="/services" className="flex gap-1.5 items-center">
        <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
        <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
