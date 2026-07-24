import Container from "@/components/shared/container";
import { RichHtml } from "@/components/shared/RichHtml";

export interface VacancySection {
  title: string;
  html: string;
}

export function DetailSections({ sections }: { sections: VacancySection[] }) {
  if (sections.length === 0) return null;

  return (
    <Container className="flex flex-col gap-12 items-start w-full pt-14 pb-[90px]">
      {sections.map((section) => (
        <div
          key={section.title}
          className="flex flex-col lg:flex-row gap-6 items-start justify-between w-full"
        >
          <p className="font-semibold text-[#040711] text-[32px] leading-10 tracking-[0.32px] shrink-0 w-full lg:w-[434px]">
            {section.title}
          </p>
          <RichHtml html={section.html} className="lg:max-w-[900px]" />
        </div>
      ))}
    </Container>
  );
}
