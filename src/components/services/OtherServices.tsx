"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { mapApiServices } from "@/lib/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import { useServices } from "@/services/service/queries";

export function OtherServices({ currentSlug }: { currentSlug: string }) {
  const { data: apiServices = [] } = useServices();

  // Every service except the current one, capped at two, laid out with the same
  // alternating wide/narrow card pattern as the services page.
  const otherServices = mapApiServices(
    apiServices.filter((service) => service.slug !== currentSlug)
  ).slice(0, 2);

  if (otherServices.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-5 items-center py-9 w-full lg:gap-12 lg:py-[90px]">
      <div className="flex flex-col gap-3 items-center text-center max-w-[343px] px-4 lg:gap-5 lg:max-w-[646px]">
        <SplitLines>
          <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
            Digər Xidmətlərimiz
          </h2>
        </SplitLines>
        <Reveal y={40} blur={8} className="w-full">
          <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
            Biznesinizin müxtəlif ehtiyaclarını qarşılamaq üçün təqdim etdiyimiz əlavə
            xidmətlərlə tanış olun.
          </p>
        </Reveal>
      </div>

      <Container className="flex flex-col items-start w-full">
        <Reveal
          y={44}
          stagger={0.15}
          end="top 55%"
          className="flex flex-col gap-3 lg:flex-row lg:gap-6 items-start w-full"
        >
          {otherServices.map((service) => (
            // A real box (not `contents`) so Reveal can animate it, carrying the
            // proportional width the ServiceCard used to contribute directly.
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`w-full min-w-0 ${service.size === "wide" ? "lg:flex-[812]" : "lg:flex-[604]"}`}
            >
              <ServiceCard {...service} />
            </Link>
          ))}
        </Reveal>
      </Container>

      <Reveal y={20} className="flex">
        <Link href="/services" className="flex gap-1.5 items-center">
          <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </Link>
      </Reveal>
    </div>
  );
}
