import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/shared/container";
import type { Project } from "@/lib/data/projects";

export function HeroDetailSection({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-[500px] md:h-[704px]">
      {project.heroImage && (
        <Image
          src={project.heroImage}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-col h-full">
        <Container className="pt-6 w-full">
          <div className="flex gap-1 items-center">
            <Link href="/projects" className="text-[#b3b5bc] text-xs">
              Layihələr
            </Link>
            <ChevronRight className="h-4 w-4 text-[#b3b5bc]" strokeWidth={1.5} />
            <p className="font-medium text-white text-xs truncate max-w-[400px]">
              {project.title}
            </p>
          </div>
        </Container>

        <Container className="flex flex-col gap-6 items-start w-full mt-auto pb-10">
          <h1 className="font-semibold text-white text-[48px] leading-[64px] max-w-[566px]">
            {project.title}
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
            <div className="flex flex-wrap gap-6 sm:gap-9 items-center text-lg tracking-[0.18px] text-white">
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Şirkət:</p>
                <p className="font-medium">{project.client}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Müddət:</p>
                <p className="font-medium">{project.duration}</p>
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Sahə:</p>
                <p className="font-medium">{project.field}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-black/32 flex items-center justify-center px-4 py-1.5 rounded-full"
                >
                  <p className="font-medium text-white text-sm tracking-[0.14px] whitespace-nowrap">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
