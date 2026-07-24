"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { mapApiProject, type ProjectDetailSection } from "@/lib/data/projects";
import { useProject } from "@/services/project/queries";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { HeroDetailSection } from "@/components/projects/hero-detail-section";
import { DetailSections } from "@/components/projects/detail-sections";
import { GallerySection } from "@/components/projects/gallery-section";

export default function ProjectDetailPage() {
  const t = useTranslations("projects.detail");
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: apiProject, isLoading } = useProject(slug);

  if (isLoading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!apiProject) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-[#5b606f]">
        {t("notFound")}
      </div>
    );
  }

  const project = mapApiProject(apiProject);

  // Section titles are localized here (the mapper stays language-agnostic);
  // empty sections are dropped.
  const sections: ProjectDetailSection[] = [
    { number: "01", title: t("sectionAbout"), paragraphs: [apiProject.about] },
    { number: "02", title: t("sectionGoal"), paragraphs: [apiProject.goal] },
    { number: "03", title: t("sectionSolution"), paragraphs: [apiProject.solution] },
  ].filter((section) => section.paragraphs.some((p) => p.trim().length > 0));

  return (
    <>
      <HeroDetailSection project={project} />
      {sections.length > 0 && <DetailSections sections={sections} />}
      {project.gallery && <GallerySection gallery={project.gallery} />}
      <RelatedProjects currentSlug={project.slug} />
    </>
  );
}
