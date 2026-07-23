import { notFound } from "next/navigation";
import { serviceDetails, type ServiceSlug } from "@/lib/data/service-details";
import { OtherServices } from "@/components/services/OtherServices";
import { HeroDetailSection } from "@/components/services/hero-detail-section";
import { WhatIncludedSection } from "@/components/services/what-included-section";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = serviceDetails[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <div className="bg-[#f7f7f7] flex flex-col gap-9 items-center pb-9 w-full lg:gap-16 lg:pb-[90px]">
        <HeroDetailSection service={service} />
        <WhatIncludedSection service={service} />
      </div>

      <OtherServices currentSlug={service.slug} />
    </>
  );
}
