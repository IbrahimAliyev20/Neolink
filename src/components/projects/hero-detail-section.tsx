import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Container from "@/components/shared/container";
import type { Project } from "@/lib/data/projects";

export function HeroDetailSection({ project }: { project: Project }) {
  const t = useTranslations("projects.detail");
  return (
    <div className="relative w-full h-[336px] lg:h-[704px]">
      {project.heroImage && (
        <Image
          src={project.heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-col h-full">
        <Container className="py-4 w-full lg:pt-6 lg:pb-0">
          <div className="flex gap-1 items-center">
            <Link href="/projects" className="text-[#b3b5bc] text-xs">
              {t("breadcrumb")}
            </Link>
            <ChevronRight className="h-4 w-4 text-[#b3b5bc]" strokeWidth={1.5} />
            <p className="font-medium text-white text-xs truncate max-w-[400px]">
              {project.title}
            </p>
          </div>
        </Container>

        <Container className="flex flex-col flex-1 justify-between items-start w-full pb-5 lg:justify-end lg:gap-6 lg:pb-10">
          <h1 className="font-semibold text-white text-xl leading-7 tracking-[0.2px] w-full lg:text-[48px] lg:leading-[64px] lg:tracking-normal lg:max-w-[566px]">
            {project.title}
          </h1>
          <div className="flex flex-col gap-6 items-start w-full lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1 items-start text-sm leading-5 tracking-[0.14px] text-white lg:flex-row lg:flex-wrap lg:items-center lg:gap-9 lg:text-lg lg:leading-normal lg:tracking-[0.18px]">
              <div className="flex gap-2 items-center">
                <p className="font-medium lg:font-semibold">{t("company")}</p>
                <p className="font-medium">{project.client}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-medium lg:font-semibold">{t("duration")}</p>
                <p className="font-medium">{project.duration}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-medium lg:font-semibold">{t("field")}</p>
                <p className="font-medium">{project.field}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-black/32 flex items-center justify-center px-3.5 py-[5px] rounded-full lg:px-4 lg:py-1.5"
                >
                  <p className="font-semibold text-white text-xs tracking-[0.12px] whitespace-nowrap lg:font-medium lg:text-sm lg:tracking-[0.14px]">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
