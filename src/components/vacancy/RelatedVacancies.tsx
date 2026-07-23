import Link from "next/link";
import { CalendarDays, Clock, ArrowUpRight, ChevronDown } from "lucide-react";
import Container from "@/components/shared/container";
import { vacancies } from "@/lib/data/vacancies";

export function RelatedVacancies({ currentSlug }: { currentSlug: string }) {
  const relatedVacancies = vacancies.filter((vacancy) => vacancy.slug !== currentSlug).slice(0, 2);

  if (relatedVacancies.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-12 items-center py-[90px] w-full">
      <div className="flex flex-col gap-5 items-center text-center max-w-[566px] px-4">
        <h2 className="font-semibold text-[#1c1c1e] text-[40px] leading-[56px] tracking-[0.4px]">
          Digər Vakansiyalarla Tanış olun
        </h2>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px]">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
      </div>

      <Container className="flex flex-col items-center w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          {relatedVacancies.map((vacancy) => (
            <div
              key={vacancy.slug}
              className="bg-white border border-[#e7e7ea] flex gap-4 items-center p-6 rounded-2xl w-full"
            >
              <div className="flex flex-col gap-4 items-start flex-1 min-w-0">
                <div className="flex flex-col gap-2.5 items-start w-full">
                  <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] w-full">
                    {vacancy.title}
                  </p>
                  <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full">
                    {vacancy.description}
                  </p>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="flex gap-1 items-center">
                    <CalendarDays className="h-5 w-5 text-[#5b606f]" strokeWidth={1.5} />
                    <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
                      {vacancy.date}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <Clock className="h-5 w-5 text-[#5b606f]" strokeWidth={1.5} />
                    <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
                      {vacancy.type}
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`/${vacancy.slug}`}
                className="bg-[#0d153a] flex gap-4 h-10 items-center justify-center px-6 py-2.5 rounded-full shrink-0"
              >
                <span className="font-medium text-white text-sm leading-5 tracking-[0.14px] whitespace-nowrap">
                  Ətraflı bax
                </span>
                <ArrowUpRight className="h-5 w-5 text-white" strokeWidth={1.5} />
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
