"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "@/components/shared/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Project } from "@/lib/data/projects";

export function GallerySection({ gallery }: { gallery: NonNullable<Project["gallery"]> }) {
  const t = useTranslations("common");

  if (gallery.length === 0) return null;

  return (
    <Container className="flex flex-col items-center w-full pt-5 pb-9 lg:pt-12 lg:pb-[90px]">
      <Carousel
        opts={{ align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 lg:-ml-6">
          {gallery.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-3 lg:pl-6 basis-[40%]"
            >
              <div className="border border-[#f2f4f8] w-full h-[212px] relative rounded-2xl overflow-hidden lg:h-[534px]">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          aria-label={t("prev")}
          className="hidden lg:flex size-10 left-4 bg-white/90 border-[#f2f4f8] text-[#040711] shadow-sm hover:bg-white"
        />
        <CarouselNext
          aria-label={t("next")}
          className="hidden lg:flex size-10 right-4 bg-white/90 border-[#f2f4f8] text-[#040711] shadow-sm hover:bg-white"
        />
      </Carousel>
    </Container>
  );
}
