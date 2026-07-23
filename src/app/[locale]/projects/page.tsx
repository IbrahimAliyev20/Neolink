"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Container from "@/components/shared/container";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectCategories, projects, getFeaturedProject, type ProjectCategory } from "@/lib/data/projects";

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(projectCategories[0]);

  const featuredProject = useMemo(() => getFeaturedProject(activeCategory), [activeCategory]);

  const gridProjects = useMemo(
    () =>
      projects.filter(
        (project) => project.category === activeCategory && project.slug !== featuredProject?.slug
      ),
    [activeCategory, featuredProject]
  );

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-[72px] items-center pt-12 pb-[90px] w-full">
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

      <div className="flex flex-col gap-9 items-center w-full">
        <Container className="flex flex-col items-start w-full">
          <CategoryTabs
            categories={projectCategories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </Container>

        <Container className="flex flex-col gap-8 items-center w-full">
          {gridProjects.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {gridProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}

          <span className="flex gap-1.5 items-center">
            <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
            <Image src="/icons/chevron-right-black.svg" alt="" width={24} height={24} />
          </span>
        </Container>
      </div>
    </div>
  );
}
