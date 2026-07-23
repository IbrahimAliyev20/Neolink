import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="border border-[#f2f4f8] h-[262px] relative rounded-[14px] w-full overflow-hidden block lg:h-[352px] lg:rounded-2xl"
    >
      <Image
        src={project.image}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[17.898%] from-[rgba(237,237,237,0.08)] via-[47.959%] via-[rgba(36,37,38,0.5)] to-[64.205%] to-[rgba(14,14,17,0.64)]" />
      <div className="absolute bottom-0 left-0 flex flex-col gap-2.5 items-start pt-3.5 pb-4 w-full lg:gap-3 lg:pb-5">
        <div className="flex gap-1.5 items-center px-3.5 flex-wrap lg:gap-2 lg:px-5">
          {project.tags.map((tag) => (
            <div
              key={tag}
              className="bg-black/32 flex items-center justify-center px-3.5 py-[5px] rounded-full lg:px-4 lg:py-1.5"
            >
              <p className="font-semibold text-white text-xs tracking-[0.12px] whitespace-nowrap lg:font-medium lg:text-sm lg:tracking-[0.14px]">
                {tag}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 items-start px-3.5 w-full lg:px-5">
          <p className="font-medium text-white text-base leading-6 tracking-[0.16px] truncate w-full lg:font-semibold lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
            {project.title}
          </p>
          <p className="text-[#b3b5bc] text-sm leading-5 tracking-[0.14px] truncate w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
