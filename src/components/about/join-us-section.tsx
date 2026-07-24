"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import Container from "@/components/shared/container";
import { useVacancies } from "@/services/vacancy/queries";

function VacancyCard({
  slug,
  title,
  description,
  date,
  type,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: string;
}) {
  const tc = useTranslations("common");
  return (
    <div className="bg-white border border-[#e7e7ea] flex flex-col gap-4 items-start p-3.5 rounded-2xl w-full lg:flex-row lg:items-center lg:p-6">
      <div className="flex flex-col gap-4 items-start flex-1 min-w-0 w-full">
        <div className="flex flex-col gap-2.5 items-start w-full">
          <p className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px] w-full lg:font-semibold lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
            {title}
          </p>
          <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
            {description}
          </p>
        </div>
        <div className="flex gap-5 items-start">
          <div className="flex gap-1 items-center">
            <CalendarDays className="h-4 w-4 lg:h-5 lg:w-5 text-[#5b606f]" strokeWidth={1.5} />
            <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
              {date}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Clock className="h-4 w-4 lg:h-5 lg:w-5 text-[#5b606f]" strokeWidth={1.5} />
            <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
              {type}
            </p>
          </div>
        </div>
      </div>
      <Link
        href={`/${slug}`}
        className="group bg-[#0d153a] flex gap-4 h-8 items-center justify-center px-6 py-2 rounded-full w-full transition-colors duration-300 hover:bg-[#3abdaa] lg:h-10 lg:py-2.5 lg:w-auto lg:shrink-0"
      >
        <span className="font-semibold text-white text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:font-medium lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
          {tc("viewDetails")}
        </span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:h-5 lg:w-5 text-white" strokeWidth={1.5} />
      </Link>
    </div>
  );
}

export function JoinUsSection() {
  const t = useTranslations("about.joinUs");
  const { data } = useVacancies();
  const openVacancies = Array.isArray(data) ? data : [];

  // No open vacancies → hide the whole section (heading, copy, email and cards).
  if (openVacancies.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center pb-9 w-full lg:pb-[90px]">
      <Container className="flex flex-col lg:flex-row gap-5 lg:gap-16 items-start w-full">
        {/* Left copy sticks 100px below the top (clear of the sticky header)
            while the taller vacancy list scrolls past it, like the home
            services section. `self-start` keeps it from stretching to the row
            height so it has room to move. */}
        <Reveal
          y={56}
          scale={0.92}
          stagger={0.22}
          className="flex flex-col gap-3 items-start flex-[576] min-w-0 w-full lg:sticky lg:top-[100px] lg:self-start"
        >
          <div className="-rotate-[6.89deg] bg-[#0d153a] flex gap-2 items-center justify-center px-3 py-2 rounded-full lg:gap-2.5 lg:px-4 lg:py-2.5">
            <Image src="/icons/briefcase.svg" alt="" width={21} height={21} className="size-4 lg:size-[21px]" />
            <p className="font-medium text-[#3abdaa] text-xs leading-4 tracking-[0.12px] whitespace-nowrap lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
              {t("badge")}
            </p>
          </div>
          <div className="flex flex-col gap-4 items-start w-full lg:gap-9">
            <div className="flex flex-col gap-3 items-start justify-center w-full lg:gap-6">
              <SplitLines>
                <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] w-full lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
                  {t("heading")}
                </h2>
              </SplitLines>
              <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                {t("desc")}
              </p>
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
              <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                {t("emailApply")}
              </p>
              <a
                href={`mailto:${t("email")}`}
                className="text-[#35ac9b] text-base leading-6 tracking-[0.16px] underline w-full"
              >
                {t("email")}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Vacancies deal in from the right, one card at a time. */}
        <Reveal
          x={80}
          y={0}
          scale={0.96}
          stagger={0.26}
          end="top 45%"
          className="flex flex-col gap-3 lg:gap-3.5 items-start flex-[800] min-w-0 w-full"
        >
          {openVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.slug}
              slug={vacancy.slug}
              title={vacancy.name}
              description={vacancy.description}
              date={vacancy.deadline}
              type={vacancy.type}
            />
          ))}
        </Reveal>
      </Container>
    </div>
  );
}
