import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronRight, CalendarDays, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/shared/container";
import devopsMuhendisiHero from "../../../public/images/vacancy/devops-muhendisi-hero.png";

export interface VacancyHero {
  title: string;
  date: string;
  type: string;
}

export function HeroSection({ vacancy }: { vacancy: VacancyHero }) {
  const t = useTranslations("vacancy.detail");
  return (
    <div className="relative w-full h-[336px] lg:h-[704px]">
      {/* The API carries no hero image, so a shared default is used. */}
      <Image
        src={devopsMuhendisiHero}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />

      <div className="relative flex flex-col h-full">
        <Container className="pt-4 w-full lg:pt-6">
          <div className="flex gap-1 items-center">
            <Link href="/about" className="text-[#b3b5bc] text-xs">
              {t("breadcrumb")}
            </Link>
            <ChevronRight className="h-4 w-4 text-[#b3b5bc]" strokeWidth={1.5} />
            <p className="font-medium text-white text-xs truncate max-w-[400px]">
              {vacancy.title}
            </p>
          </div>
        </Container>

        <Container className="flex flex-col gap-4 items-start w-full mt-auto pb-12 lg:gap-6 lg:pb-10">
          <h1 className="font-semibold text-white text-[20px] leading-[28px] tracking-[0.2px] lg:text-[48px] lg:leading-[64px] lg:tracking-normal lg:max-w-[566px]">
            {vacancy.title}
          </h1>
          <div className="flex gap-6 items-center w-full lg:gap-9">
            <div className="flex gap-2 items-center">
              <CalendarDays className="h-5 w-5 text-white lg:h-6 lg:w-6" strokeWidth={1.5} />
              <p className="font-medium text-white text-sm tracking-[0.14px] lg:text-lg lg:tracking-[0.18px]">
                {vacancy.date}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Clock className="h-5 w-5 text-white lg:h-6 lg:w-6" strokeWidth={1.5} />
              <p className="font-medium text-white text-sm tracking-[0.14px] lg:text-lg lg:tracking-[0.18px]">
                {vacancy.type}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
