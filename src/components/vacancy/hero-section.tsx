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
    <div className="relative w-full h-[500px] md:h-[704px]">
      {/* The API carries no hero image, so a shared default is used. */}
      <Image
        src={devopsMuhendisiHero}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-col h-full">
        <Container className="pt-6 w-full">
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

        <Container className="flex flex-col gap-6 items-start w-full mt-auto pb-10">
          <h1 className="font-semibold text-white text-[48px] leading-[64px] max-w-[566px]">
            {vacancy.title}
          </h1>
          <div className="flex gap-9 items-center w-full">
            <div className="flex gap-2 items-center">
              <CalendarDays className="h-6 w-6 text-white" strokeWidth={1.5} />
              <p className="font-medium text-white text-lg tracking-[0.18px]">{vacancy.date}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Clock className="h-6 w-6 text-white" strokeWidth={1.5} />
              <p className="font-medium text-white text-lg tracking-[0.18px]">{vacancy.type}</p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
