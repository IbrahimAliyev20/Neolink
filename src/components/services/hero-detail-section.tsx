"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/container";
import { OfferModal } from "@/components/shared/OfferModal";
import type { ServiceDetail } from "@/lib/data/service-details";

export function HeroDetailSection({ service }: { service: ServiceDetail }) {
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  return (
    <Container className="flex flex-col items-start w-full">
      <div className="flex flex-col gap-5 lg:flex-row lg:gap-16 xl:gap-[132px] items-center w-full">
        <div className="flex flex-col gap-5 items-start w-full lg:gap-12 lg:flex-1 lg:min-w-0">
          <div className="flex flex-col gap-3 items-start w-full lg:gap-6">
            <h1 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
              {service.title}
            </h1>
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              {service.description}
            </p>
          </div>
          <div className="flex gap-5 items-start w-full">
            <button
              type="button"
              onClick={() => setIsOfferModalOpen(true)}
              className="bg-[#3abdaa] flex gap-4 h-10 items-center justify-center px-6 py-2.5 rounded-full w-full lg:gap-2 lg:h-12 lg:px-16 lg:py-3 lg:w-auto"
            >
              <span className="font-medium text-white text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                Təklif al
              </span>
              <ArrowUpRight className="h-5 w-5 text-white" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="border border-[#e7e7ea] h-[247px] relative rounded-2xl w-full overflow-hidden lg:h-[474px] lg:rounded-[20px] lg:flex-1 lg:min-w-0">
          <Image
            src={service.heroImage}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </div>
      </div>

      <OfferModal open={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} />
    </Container>
  );
}
