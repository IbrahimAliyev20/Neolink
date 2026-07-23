import Image from "next/image";
import Container from "@/components/shared/container";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import type { Project } from "@/lib/data/projects";

export function HeroSection({ featuredProject }: { featuredProject: Project | undefined }) {
  return (
    <Container className="flex flex-col lg:flex-row gap-10 items-center justify-between w-full">
      <div className="flex flex-col gap-5 items-start w-full lg:w-[560px]">
        <div className="-rotate-[6.89deg] bg-[#0d153a] flex gap-3 items-center justify-center px-3 py-2 rounded-full">
          <Image src="/icons/folders.svg" alt="" width={21} height={21} />
          <p className="font-semibold text-[#3abdaa] text-xs tracking-[0.12px] whitespace-nowrap">
            120+ Layihə
          </p>
        </div>
        <h1 className="font-semibold text-[#1c1c1e] text-[48px] leading-[64px] w-full">
          Layihələrimizlə yaxından tanış olun
        </h1>
        <p className="text-[#5b606f] text-base leading-6 tracking-[0.16px] w-full">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
      </div>

      {featuredProject && <FeaturedProject project={featuredProject} />}
    </Container>
  );
}
