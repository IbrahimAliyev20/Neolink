import Image from "next/image";
import Container from "@/components/shared/container";
import type { ServiceDetail } from "@/lib/data/service-details";

export function WhatIncludedSection({ service }: { service: ServiceDetail }) {
  return (
    <Container className="flex flex-col lg:flex-row gap-12 items-center w-full">
      <div className="flex flex-col gap-6 items-start flex-1 min-w-0 w-full">
        <h2 className="font-semibold text-[#040711] text-[40px] leading-[56px] tracking-[0.4px] max-w-[452px]">
          {service.whatIncludedTitle}
        </h2>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
          {service.whatIncludedDescription}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-[1.5] min-w-0 w-full">
        {service.whatIncluded.map((item) => (
          <div
            key={item.title}
            className="bg-[#f7f7f7] flex flex-col gap-5 items-start px-6 py-5 rounded-xl w-full"
          >
            <div className="bg-white flex items-center justify-center p-2 rounded-xl size-[52px]">
              <Image src={item.icon} alt="" width={30} height={30} />
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
              <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] w-full">
                {item.title}
              </p>
              <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
