"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/container";
import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import { useServiceInclude } from "@/services/service-include/queries";

export function WhatIncludedSection({ slug }: { slug: string }) {
  const t = useTranslations("services.whatIncluded");
  const { data: items = [] } = useServiceInclude(slug);

  if (items.length === 0) return null;

  return (
    <Container className="flex flex-col gap-6 items-center lg:flex-row lg:gap-12 w-full">
      <div className="flex flex-col gap-4 items-start w-full lg:gap-6 lg:flex-1 lg:min-w-0">
        <SplitLines>
          <h2 className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] w-full lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px] lg:max-w-[452px]">
            {t("heading")}
          </h2>
        </SplitLines>
        <Reveal y={44} blur={8} className="w-full">
          <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
            {t("lead")}
          </p>
        </Reveal>
      </div>
      <Reveal
        key={items.length}
        y={40}
        stagger={0.12}
        end="top 50%"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 w-full lg:flex-[1.5] lg:min-w-0"
      >
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-[#f7f7f7] flex flex-col gap-3 items-start p-3.5 rounded-xl w-full lg:gap-5 lg:px-6 lg:py-5"
          >
            <div className="bg-white flex items-center justify-center p-2 rounded-lg size-10 lg:rounded-xl lg:size-[52px]">
              <Image src={item.icon} alt="" width={30} height={30} className="size-6 lg:size-[30px]" />
            </div>
            <div className="flex flex-col gap-2 items-start w-full">
              <p className="font-semibold text-[#040711] text-base leading-6 tracking-[0.16px] w-full lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
                {item.title}
              </p>
              <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </Container>
  );
}
