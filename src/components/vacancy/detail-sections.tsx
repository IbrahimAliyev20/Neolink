import Container from "@/components/shared/container";
import { RichHtml } from "@/components/shared/RichHtml";

export interface VacancySection {
  title: string;
  html: string;
}

export function DetailSections({ sections }: { sections: VacancySection[] }) {
  if (sections.length === 0) return null;

  return (
    <Container className="flex flex-col gap-5 items-start w-full pt-9 pb-9 lg:gap-12 lg:pt-14 lg:pb-[90px]">
      {sections.map((section) => (
        <div
          key={section.title}
          className="flex flex-col gap-3 items-start justify-between w-full lg:flex-row lg:gap-6"
        >
          <p className="font-semibold text-[#040711] text-[20px] leading-[28px] tracking-[0.2px] shrink-0 w-full lg:w-[434px] lg:text-[32px] lg:leading-10 lg:tracking-[0.32px]">
            {section.title}
          </p>
          <RichHtml html={section.html} className="lg:max-w-[900px]" />
        </div>
      ))}
    </Container>
  );
}
