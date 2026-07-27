"use client";

import { useParams } from "next/navigation";
import { OtherServices } from "@/components/services/OtherServices";
import { HeroDetailSection } from "@/components/services/hero-detail-section";
import { WhatIncludedSection } from "@/components/services/what-included-section";
import { useService } from "@/services/service/queries";

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { data: service, isLoading } = useService(slug);

  if (isLoading) {
    return <div className="min-h-[60vh]" />;
  }

  if (!service) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-[#5b606f]">
        Xidmət tapılmadı.
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f7f7f7] flex flex-col items-center pb-9 w-full pt-8 lg:pb-[90px] lg:pt-14">
        <HeroDetailSection
          service={{
            slug: service.slug,
            title: service.name,
            // Raw editor HTML — the hero renders it with its formatting intact.
            description: service.description,
            heroImage: service.cover_image_home,
          }}
        />
      </div>

      {/* White band: the cards carry the #f7f7f7 fill, so they only read as
          cards when the surface behind them is white. */}
      <div className="bg-white flex flex-col items-center py-9 w-full lg:py-[90px]">
        <WhatIncludedSection slug={service.slug} />
      </div>

      <OtherServices currentSlug={service.slug} />
    </>
  );
}
