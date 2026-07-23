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
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-[132px] items-center w-full">
        <div className="flex flex-col gap-12 items-start flex-1 min-w-0 w-full">
          <div className="flex flex-col gap-6 items-start w-full">
            <h1 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px]">
              {service.title}
            </h1>
            <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
              {service.description}
            </p>
          </div>
          <div className="flex gap-5 items-start w-full">
            <button
              type="button"
              onClick={() => setIsOfferModalOpen(true)}
              className="bg-[#3abdaa] flex gap-2 h-12 items-center justify-center px-16 py-3 rounded-full"
            >
              <span className="font-medium text-white text-base leading-6 tracking-[0.16px]">
                Təklif al
              </span>
              <ArrowUpRight className="h-5 w-5 text-white" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="border border-[#e7e7ea] h-[474px] relative rounded-[20px] flex-1 min-w-0 w-full overflow-hidden">
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
