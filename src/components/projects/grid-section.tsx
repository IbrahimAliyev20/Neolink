import { ChevronRight } from "lucide-react";
import Container from "@/components/shared/container";
import { CategoryTabs } from "@/components/shared/CategoryTabs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { type Project } from "@/lib/data/projects";

export function GridSection({
  categories,
  activeCategory,
  onChange,
  projects,
}: {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  projects: Project[];
}) {
  return (
    <div className="flex flex-col gap-9 items-center w-full">
      <Container className="flex flex-col items-start w-full">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={onChange}
        />
      </Container>

      <Container className="flex flex-col gap-8 items-center w-full">
        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}

        <span className="flex gap-1.5 items-center">
          <span className="font-medium text-[#20201e] text-base leading-6">Hamısına bax</span>
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </span>
      </Container>
    </div>
  );
}
