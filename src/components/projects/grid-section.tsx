"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/container";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/animation/reveal";
import { type Project } from "@/lib/data/projects";

export function GridSection({
  categories,
  activeCategory,
  onChange,
  projects,
}: {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  projects: Project[];
}) {
  const tc = useTranslations("common");
  return (
    <div className="flex flex-col gap-9 items-center w-full">
      <Container className="flex flex-col items-start w-full">
        <Reveal y={24} blur={6} className="w-full">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onChange={onChange}
          />
        </Reveal>
      </Container>

      <Container className="flex flex-col gap-8 items-center w-full">
        {projects.length > 0 && (
          // Re-keyed per category so the stagger plays again on every filter
          // switch: Reveal captures its children on mount, so a fresh key is
          // what makes the new set animate instead of snapping in.
          <Reveal
            key={activeCategory}
            y={40}
            stagger={0.12}
            end="top 55%"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Reveal>
        )}

        <Reveal y={20} className="flex">
          <span className="flex gap-1.5 items-center">
            <span className="font-medium text-[#20201e] text-base leading-6">{tc("seeAll")}</span>
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </span>
        </Reveal>
      </Container>
    </div>
  );
}
