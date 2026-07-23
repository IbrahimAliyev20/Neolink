import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/shared/container";
import { getBlogPostBySlug, type BlogContentSection, type BlogTextBlock } from "@/lib/data/blogs";
import { RelatedPosts } from "@/components/blog/RelatedPosts";

const shareLinks = [
  { icon: "/icons/brand-instagram.svg", label: "Instagram", variant: "light" as const },
  { icon: "/icons/link.svg", label: "Linki kopyala", variant: "dark" as const },
  { icon: "/icons/brand-facebook.svg", label: "Facebook", variant: "light" as const },
  { icon: "/icons/twitter-x.svg", label: "X (Twitter)", variant: "light" as const },
];

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

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post || !post.content || !post.coverImage) {
    notFound();
  }

  return (
    <>
    <div className="bg-white flex flex-col items-center pb-[90px] w-full">
      <Container className="flex flex-col items-center w-full">
        <div className="flex flex-col gap-8 items-center w-full">
          <div className="flex flex-col gap-7 items-center w-full">
            <h1 className="font-semibold text-[#040711] text-[40px] leading-[56px] text-center tracking-[0.4px] max-w-[890px]">
              {post.title}
            </h1>
            <div className="flex gap-2 items-center flex-wrap justify-center">
              <div className="flex gap-2.5 items-center">
                <Image src="/icons/clock9.svg" alt="" width={20} height={20} />
                <p className="font-medium text-[#4d4d4b] text-sm whitespace-nowrap">
                  {post.readTime}
                </p>
              </div>
              <div className="bg-[#989898] rounded-full shrink-0 size-1" />
              <div className="flex gap-1 items-center font-medium text-[#4d4d4b] text-sm whitespace-nowrap">
                <p>Dərc edildi:</p>
                <p>{post.dateLabel}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 items-start justify-center w-full">
            <div className="flex lg:flex-col flex-row gap-3 items-center lg:items-start lg:pt-[86px]">
              {shareLinks.map((share) => (
                <button
                  key={share.label}
                  type="button"
                  aria-label={share.label}
                  className={`flex items-center justify-center p-3 rounded-full shrink-0 ${
                    share.variant === "dark"
                      ? "bg-[#3abdaa]"
                      : "bg-white border border-[#e7e7ea]"
                  }`}
                >
                  <Image src={share.icon} alt="" width={32} height={32} />
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-8 items-start flex-1 min-w-0 max-w-[1000px] w-full">
              <div className="border border-[#f2f4f8] h-[600px] relative rounded-2xl w-full overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 1000px, 100vw"
                  priority
                />
              </div>

              <div className="flex flex-col gap-8 items-start w-full">
                {post.content.map((section, index) => (
                  <ContentSectionRenderer key={index} section={section} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>

    <RelatedPosts currentSlug={post.slug} />
    </>
  );
}
