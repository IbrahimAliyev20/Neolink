"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/container";
import { mapApiProject } from "@/lib/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { useProjects } from "@/services/project/queries";

export function RelatedProjects({ currentSlug }: { currentSlug: string }) {
  const { data: apiProjects } = useProjects();

  // All projects except the one being viewed, capped at three.
  const relatedProjects = (apiProjects ?? [])
    .filter((project) => project.slug !== currentSlug)
    .slice(0, 3)
    .map(mapApiProject);

  if (relatedProjects.length === 0) {
    return null;
  }

  return (
    <div className="bg-white flex flex-col gap-6 items-center py-9 w-full lg:gap-12 lg:py-[90px]">
      <div className="flex flex-col gap-3 items-center text-center max-w-[343px] px-4 lg:gap-5 lg:max-w-[566px]">
        <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
          Digər Layihələrimizlə Tanış olum
        </h2>
        <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
      </div>

      <Container className="flex flex-col items-center w-full">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-6 w-full">
          {relatedProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>

      <Link href="/projects" className="flex gap-1.5 items-center">
        <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
        <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
