import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="border border-[#f2f4f8] h-[352px] relative rounded-2xl w-full overflow-hidden block"
    >
      <Image
        src={project.image}
        alt=""
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[17.898%] from-[rgba(237,237,237,0.08)] via-[47.959%] via-[rgba(36,37,38,0.5)] to-[64.205%] to-[rgba(14,14,17,0.64)]" />
      <div className="absolute bottom-0 left-0 flex flex-col gap-3 items-start pt-3.5 pb-5 w-full">
        <div className="flex gap-2 items-center px-5 flex-wrap">
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
        <div className="flex flex-col gap-1 items-start px-5 w-full">
          <p className="font-semibold text-white text-xl leading-7 tracking-[0.2px] truncate w-full">
            {project.title}
          </p>
          <p className="text-[#b3b5bc] text-base leading-6 tracking-[0.16px] truncate w-full">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
