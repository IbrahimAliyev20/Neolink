import Image from "next/image";
import Container from "@/components/shared/container";
import type { Project } from "@/lib/data/projects";

export function GallerySection({ gallery }: { gallery: NonNullable<Project["gallery"]> }) {
  if (gallery.length === 0) return null;

  return (
    <Container className="flex flex-col items-center w-full pt-5 pb-9 lg:pt-12 lg:pb-[90px]">
      <div className="flex flex-col gap-3 lg:flex-row lg:gap-6 items-start w-full">
        {gallery.map((image, index) => (
          <div
            key={index}
            className="border border-[#f2f4f8] w-full h-[212px] relative rounded-2xl overflow-hidden lg:flex-1 lg:min-w-0 lg:h-[534px]"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
