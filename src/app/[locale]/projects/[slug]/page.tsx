"use client";

import { useParams } from "next/navigation";
import { mapApiProject } from "@/lib/data/projects";
import { useProject } from "@/services/project/queries";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { HeroDetailSection } from "@/components/projects/hero-detail-section";
import { DetailSections } from "@/components/projects/detail-sections";
import { GallerySection } from "@/components/projects/gallery-section";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: apiProject, isLoading } = useProject(slug);

  if (isLoading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!apiProject) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-[#5b606f]">
        Layihə tapılmadı.
      </div>
    );
  }

  const project = mapApiProject(apiProject);

  return (
    <>
      <HeroDetailSection project={project} />
      {project.detailSections && <DetailSections sections={project.detailSections} />}
      {project.gallery && <GallerySection gallery={project.gallery} />}
      <RelatedProjects currentSlug={project.slug} />
    </>
  );
}
