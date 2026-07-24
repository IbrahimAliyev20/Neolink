"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSection } from "@/components/projects/hero-section";
import { GridSection } from "@/components/projects/grid-section";
import { mapApiProject } from "@/lib/data/projects";
import { useProjectTags } from "@/services/project-tags/queries";
import { useProjects, useProjectsByTag } from "@/services/project/queries";

export default function ProjectPage() {
  const { data: tags } = useProjectTags();
  const { data: allProjects } = useProjects();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Only keep tags that actually have projects, so empty tabs never show. A
  // project can carry several tags, so we collect every tag name in use.
  const availableTags = useMemo(() => {
    if (!tags) return [];
    if (!allProjects) return tags;
    const tagsInUse = new Set(allProjects.flatMap((project) => project.projecttags));
    return tags.filter((tag) => tagsInUse.has(tag.name));
  }, [tags, allProjects]);

  // Default to the first available tag (and correct the selection if the active
  // one drops out of the list).
  useEffect(() => {
    if (
      availableTags.length > 0 &&
      !availableTags.some((tag) => tag.slug === activeSlug)
    ) {
      setActiveSlug(availableTags[0].slug);
    }
  }, [availableTags, activeSlug]);

  const { data: apiProjects } = useProjectsByTag(activeSlug ?? undefined);

  const gridProjects = useMemo(
    () => (apiProjects ?? []).map(mapApiProject),
    [apiProjects]
  );

  const categories = availableTags.map((tag) => tag.name);
  const activeCategory =
    availableTags.find((tag) => tag.slug === activeSlug)?.name ??
    categories[0] ??
    "";

  const handleChange = (name: string) => {
    const tag = availableTags.find((t) => t.name === name);
    if (tag) setActiveSlug(tag.slug);
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-col gap-[72px] items-center pb-[90px] w-full">
      <HeroSection />
      <GridSection
        categories={categories}
        activeCategory={activeCategory}
        onChange={handleChange}
        projects={gridProjects}
      />
    </div>
  );
}
