import { notFound } from "next/navigation";
import { getVacancyBySlug } from "@/lib/data/vacancies";
import { HeroSection } from "@/components/vacancy/hero-section";
import { DetailSections } from "@/components/vacancy/detail-sections";
import { ApplySection } from "@/components/vacancy/apply-section";
import { RelatedVacancies } from "@/components/vacancy/RelatedVacancies";

export default async function VacancyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vacancy = getVacancyBySlug(slug);

  if (!vacancy || !vacancy.sections) {
    notFound();
  }

  return (
    <>
      <HeroSection vacancy={vacancy} />
      <DetailSections sections={vacancy.sections} />
      <ApplySection />
      <RelatedVacancies currentSlug={vacancy.slug} />
    </>
  );
}
