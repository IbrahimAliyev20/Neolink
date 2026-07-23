import Image from "next/image";
import type { BlogContentSection, BlogTextBlock } from "@/lib/data/blogs";

function TextBlockRenderer({ block }: { block: BlogTextBlock }) {
  if (block.type === "list") {
    return (
      <ul className="flex flex-col gap-3.5 items-start w-full list-disc ps-6 text-[#5b606f] text-base leading-6">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p className="text-[#5b606f] text-base leading-6 w-full">{block.text}</p>;
}

function ContentSectionRenderer({ section }: { section: BlogContentSection }) {
  if (section.type === "gallery") {
    return (
      <div className="flex flex-col sm:flex-row gap-5 items-center w-full">
        {section.images.map((image, index) => (
          <div
            key={index}
            className="border border-[#f2f4f8] flex-1 min-w-0 w-full h-[312px] relative rounded-2xl overflow-hidden"
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 items-start w-full">
      <h2 className="font-medium text-[#20201e] text-[28px] leading-9 w-full">
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
    <div className="flex flex-col gap-8 items-start w-full">
      {content.map((section, index) => (
        <ContentSectionRenderer key={index} section={section} />
      ))}
    </div>
  );
}
