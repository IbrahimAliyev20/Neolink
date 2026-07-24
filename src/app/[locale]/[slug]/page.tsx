"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { HeroSection } from "@/components/vacancy/hero-section";
import { DetailSections, type VacancySection } from "@/components/vacancy/detail-sections";
import { ApplySection } from "@/components/vacancy/apply-section";
import { RelatedVacancies } from "@/components/vacancy/RelatedVacancies";
import { useVacancy } from "@/services/vacancy/queries";

export default function VacancyDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const t = useTranslations("vacancy.detail");

  const { data: vacancy, isLoading } = useVacancy(slug);

  if (isLoading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!vacancy) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-[#5b606f]">
        {t("notFound")}
      </div>
    );
  }

  // Field→heading mapping per the documented backend contract (see
  // vacancy/api.ts): the `offer` field carries the candidate requirements shown
  // under "Namizəddən gözləntilər", and `expectations` carries the perks shown
  // under "Təkliflərimiz". Empty sections are dropped.
  const sections: VacancySection[] = [
    { title: t("sectionAbout"), html: vacancy.about },
    { title: t("sectionExpectations"), html: vacancy.offer },
    { title: t("sectionOffer"), html: vacancy.expectations },
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
