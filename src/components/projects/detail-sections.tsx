import Container from "@/components/shared/container";
import type { ProjectDetailSection } from "@/lib/data/projects";

export function DetailSections({ sections }: { sections: ProjectDetailSection[] }) {
  return (
    <Container className="flex flex-col gap-5 items-start w-full pt-9 lg:gap-12 lg:pt-14">
      {sections.map((section) => (
        <div
          key={section.number}
          className="flex flex-col gap-3 lg:flex-row lg:gap-6 items-start justify-between w-full"
        >
          <p className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] shrink-0 w-full lg:text-[32px] lg:leading-10 lg:tracking-[0.32px] lg:w-[434px]">
            {section.number}. {section.title}
          </p>
          <div className="flex flex-col gap-4 lg:gap-6 items-start w-full lg:max-w-[900px]">
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </Container>
  );
}
