import Image from "next/image";
import type { BlogContentSection, BlogTextBlock } from "@/lib/data/blogs";

function TextBlockRenderer({ block }: { block: BlogTextBlock }) {
  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-2.5 lg:gap-3.5 items-start w-full list-disc ps-6 text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-normal">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-normal">
      {block.text}
    </p>
  );
}

function ContentSectionRenderer({ section }: { section: BlogContentSection }) {
  if (section.type === "gallery") {
    return (
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-5 items-center w-full">
        {section.images.map((image, index) => (
          <div
            key={index}
            className="border border-[#f2f4f8] lg:flex-1 lg:min-w-0 w-full h-[212px] lg:h-[312px] relative rounded-2xl overflow-hidden"
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
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-5 items-start w-full">
      <h2 className="font-medium text-[#20201e] text-xl leading-7 tracking-[0.2px] w-full lg:text-[28px] lg:leading-9 lg:tracking-normal">
        {section.heading}
      </h2>
      {section.blocks.map((block, index) => (
        <TextBlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

export function ContentSection({ content }: { content: BlogContentSection[] }) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 items-start w-full">
      {content.map((section, index) => (
        <ContentSectionRenderer key={index} section={section} />
      ))}
    </div>
  );
}
