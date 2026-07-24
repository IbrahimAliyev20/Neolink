"use client";

import Link from "next/link";
import { CalendarDays, Clock, ArrowUpRight, ChevronDown } from "lucide-react";
import Container from "@/components/shared/container";
import { useVacancies } from "@/services/vacancy/queries";

export function RelatedVacancies({ currentSlug }: { currentSlug: string }) {
  const { data: apiVacancies = [] } = useVacancies();

  const relatedVacancies = apiVacancies
    .filter((vacancy) => vacancy.slug !== currentSlug)
    .slice(0, 2);

  if (relatedVacancies.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-6 items-center py-9 w-full lg:gap-12 lg:py-[90px]">
      <div className="flex flex-col gap-3 items-center text-center max-w-[566px] px-4 lg:gap-5">
        <h2 className="font-semibold text-[#1c1c1e] text-[20px] leading-[28px] tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
          Digər Vakansiyalarla Tanış olun
        </h2>
        <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
      </div>

      <Container className="flex flex-col items-center w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          {relatedVacancies.map((vacancy) => (
            <div
              key={vacancy.slug}
              className="bg-white border border-[#e7e7ea] flex flex-col gap-4 items-start p-3.5 rounded-[14px] w-full lg:flex-row lg:items-center lg:p-6 lg:rounded-2xl"
            >
              <div className="flex flex-col gap-4 items-start flex-1 min-w-0 w-full">
                <div className="flex flex-col gap-2.5 items-start w-full">
                  <p className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px] w-full lg:font-semibold lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
                    {vacancy.name}
                  </p>
                  <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
                    {vacancy.description}
                  </p>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="flex gap-1 items-center">
                    <CalendarDays className="h-4 w-4 text-[#5b606f] lg:h-5 lg:w-5" strokeWidth={1.5} />
                    <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
                      {vacancy.deadline}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Clock className="h-4 w-4 text-[#5b606f] lg:h-5 lg:w-5" strokeWidth={1.5} />
                    <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
                      {vacancy.type}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/${vacancy.slug}`}
                className="bg-[#0d153a] flex gap-4 h-8 items-center justify-center px-6 py-2 rounded-full w-full lg:h-10 lg:w-auto lg:py-2.5 lg:shrink-0"
              >
                <span className="font-semibold text-white text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:font-medium lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
                  Ətraflı bax
                </span>
                <ArrowUpRight className="h-4 w-4 text-white lg:h-5 lg:w-5" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </Container>

      <Link href="/about" className="flex gap-1.5 items-center">
        <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
