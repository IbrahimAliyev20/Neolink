import Container from "@/components/shared/container";
import type { ProjectDetailSection } from "@/lib/data/projects";

export function DetailSections({ sections }: { sections: ProjectDetailSection[] }) {
  return (
    <Container className="flex flex-col gap-12 items-start w-full pt-14">
      {sections.map((section) => (
        <div
          key={section.number}
          className="flex flex-col lg:flex-row gap-6 items-start justify-between w-full"
        >
          <p className="font-semibold text-[#040711] text-[32px] leading-10 tracking-[0.32px] shrink-0 w-full lg:w-[434px]">
            {section.number}. {section.title}
          </p>
          <div className="flex flex-col gap-6 items-start w-full lg:max-w-[900px]">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[#5b606f] text-base leading-6 w-full">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}
