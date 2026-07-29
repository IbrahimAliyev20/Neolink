"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { HeroSection } from "@/components/projects/hero-section";
import { GridSection } from "@/components/projects/grid-section";
import { mapApiProject } from "@/lib/data/projects";
import { useProjectTags } from "@/services/project-tags/queries";
import { useProjects, useProjectsByTag } from "@/services/project/queries";

export default function ProjectPage() {
  const tc = useTranslations("common");
  const { data: tags } = useProjectTags();
  const { data: allProjects } = useProjects();
  // `null` is the "All" tab: no tag filter, the full `/projects` list is shown.
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const allLabel = tc("all");

  // Only keep tags that actually have projects, so empty tabs never show. A
  // project can carry several tags, so we collect every tag name in use.
  const availableTags = useMemo(() => {
    if (!tags) return [];
    if (!allProjects) return tags;
    const tagsInUse = new Set(allProjects.flatMap((project) => project.projecttags));
    return tags.filter((tag) => tagsInUse.has(tag.name));
  }, [tags, allProjects]);

  // Fall back to "All" if the active tag drops out of the list (e.g. after a
  // language switch reloads the tags).
  useEffect(() => {
    if (activeSlug && !availableTags.some((tag) => tag.slug === activeSlug)) {
      setActiveSlug(null);
    }
  }, [availableTags, activeSlug]);

  // Skipped while "All" is selected — the unfiltered list is used instead.
  const { data: apiProjects } = useProjectsByTag(activeSlug ?? undefined);

  const gridProjects = useMemo(
    () => (activeSlug ? apiProjects ?? [] : allProjects ?? []).map(mapApiProject),
    [activeSlug, apiProjects, allProjects]
  );

  // "All" leads the tab strip, then the tags that actually have projects.
  const categories = [allLabel, ...availableTags.map((tag) => tag.name)];
  const activeCategory =
    availableTags.find((tag) => tag.slug === activeSlug)?.name ?? allLabel;

  const handleChange = (name: string) => {
    if (name === allLabel) {
      setActiveSlug(null);
      return;
    }
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
