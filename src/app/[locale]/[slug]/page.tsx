"use client";

import { useParams } from "next/navigation";
import { HeroSection } from "@/components/vacancy/hero-section";
import { DetailSections, type VacancySection } from "@/components/vacancy/detail-sections";
import { ApplySection } from "@/components/vacancy/apply-section";
import { RelatedVacancies } from "@/components/vacancy/RelatedVacancies";
import { useVacancy } from "@/services/vacancy/queries";

export default function VacancyDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: vacancy, isLoading } = useVacancy(slug);

  if (isLoading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!vacancy) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-[#5b606f]">
        Vakansiya tapılmadı.
      </div>
    );
  }

  // Field names map to the section headings by content: `about` is the intro,
  // `offer` holds the candidate requirements, `expectations` the perks. Empty
  // sections are dropped.
  const sections: VacancySection[] = [
    { title: "Vakansiya haqqında", html: vacancy.about },
    { title: "Namizəddən gözləntilər", html: vacancy.offer },
    { title: "Təkliflərimiz", html: vacancy.expectations },
  ].filter((section) => section.html.trim().length > 0);

  return (
    <>
      <HeroSection
        vacancy={{ title: vacancy.name, date: vacancy.deadline, type: vacancy.type }}
      />
      <DetailSections sections={sections} />
      <ApplySection vacancyId={String(vacancy.id ?? vacancy.slug)} />
      <RelatedVacancies currentSlug={vacancy.slug} />
    </>
  );
}
