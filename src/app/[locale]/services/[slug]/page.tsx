"use client";

import { useParams } from "next/navigation";
import Container from "@/components/shared/container";
import { RichHtml } from "@/components/shared/RichHtml";
import { OtherServices } from "@/components/services/OtherServices";
import { HeroDetailSection } from "@/components/services/hero-detail-section";
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
            description: service.short_description,
            heroImage: service.cover_image_home,
          }}
        />
        <Container className="flex flex-col items-start w-full">
          <RichHtml html={service.description} />
        </Container>
      </div>

      <OtherServices currentSlug={service.slug} />
    </>
  );
}
