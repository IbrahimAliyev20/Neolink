import Image from "next/image";
import Container from "@/components/shared/container";
import type { Project } from "@/lib/data/projects";

export function GallerySection({ gallery }: { gallery: NonNullable<Project["gallery"]> }) {
  return (
    <Container className="flex flex-col items-center w-full pt-12 pb-[90px]">
      <div className="flex flex-col sm:flex-row gap-6 items-start w-full">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="border border-[#f2f4f8] flex-1 min-w-0 w-full h-[534px] relative rounded-2xl overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
