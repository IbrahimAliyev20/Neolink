"use client";

import { useMemo, useState } from "react";
import { HeroSection } from "@/components/projects/hero-section";
import { GridSection } from "@/components/projects/grid-section";
import {
  projectCategories,
  projects,
  getFeaturedProject,
  type ProjectCategory,
} from "@/lib/data/projects";

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
      <HeroSection featuredProject={featuredProject} />
      <GridSection activeCategory={activeCategory} onChange={setActiveCategory} projects={gridProjects} />
    </div>
  );
}
