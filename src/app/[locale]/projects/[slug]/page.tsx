import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/data/projects";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { HeroDetailSection } from "@/components/projects/hero-detail-section";
import { DetailSections } from "@/components/projects/detail-sections";
import { GallerySection } from "@/components/projects/gallery-section";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (
    !project ||
    !project.heroImage ||
    !project.client ||
    !project.duration ||
    !project.field ||
    !project.detailSections ||
    !project.gallery
  ) {
    notFound();
  }

  return (
    <>
      <HeroDetailSection project={project} />
      <DetailSections sections={project.detailSections} />
      <GallerySection gallery={project.gallery} />
      <RelatedProjects currentSlug={project.slug} />
    </>
  );
}
