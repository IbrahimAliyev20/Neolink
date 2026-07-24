"use client";

import { useParams } from "next/navigation";
import { stripHtml } from "@/lib/data/blogs";
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
      <div className="bg-[#f7f7f7] flex flex-col gap-9 items-center pb-9 w-full pt-8 lg:gap-16 lg:pb-[90px] lg:pt-14">
        <HeroDetailSection
          service={{
            slug: service.slug,
            title: service.name,
            description: stripHtml(service.description),
            heroImage: service.cover_image_home,
          }}
        />
        <WhatIncludedSection slug={service.slug} />
      </div>

      <OtherServices currentSlug={service.slug} />
    </>
  );
}
