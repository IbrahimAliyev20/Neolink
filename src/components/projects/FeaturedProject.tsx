import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="border border-[#f2f4f8] h-[440px] relative rounded-2xl shrink-0 w-full lg:w-[710px] overflow-hidden block"
    >
      <Image
        src={project.image}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 710px, 100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-[17.898%] from-[rgba(237,237,237,0.08)] via-[47.959%] via-[rgba(36,37,38,0.5)] to-[64.205%] to-[rgba(14,14,17,0.64)]" />
      <div className="absolute bottom-0 left-0 flex flex-col gap-4 items-start px-6 pt-5 pb-6 w-full">
        <div className="flex gap-2 items-center px-2 flex-wrap">
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
        <div className="flex flex-col gap-3 items-start px-2 w-full">
          <p className="font-semibold text-2xl leading-8 text-white tracking-[0.24px] w-full">
            {project.title}
          </p>
          <p className="text-base leading-6 text-[#e7e7ea] tracking-[0.16px] w-full truncate">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
