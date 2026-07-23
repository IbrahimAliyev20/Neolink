import Image from "next/image";
import Container from "@/components/shared/container";
import type { BlogPost } from "@/lib/data/blogs";

const shareLinks = [
  { icon: "/icons/brand-instagram.svg", label: "Instagram", variant: "light" as const },
  { icon: "/icons/link.svg", label: "Linki kopyala", variant: "dark" as const },
  { icon: "/icons/brand-facebook.svg", label: "Facebook", variant: "light" as const },
  { icon: "/icons/twitter-x.svg", label: "X (Twitter)", variant: "light" as const },
];

const shareLinksMobile = [
  { icon: "/icons/brand-instagram.svg", label: "Instagram", variant: "light" as const },
  { icon: "/icons/brand-instagram.svg", label: "Linki kopyala", variant: "dark" as const },
  { icon: "/icons/brand-facebook.svg", label: "Facebook", variant: "light" as const },
  { icon: "/icons/twitter-x.svg", label: "X (Twitter)", variant: "light" as const },
];

function ShareButtons({ variant }: { variant: "mobile" | "desktop" }) {
  return (
    <div
      className={
        variant === "mobile"
          ? "flex lg:hidden gap-1 items-center"
          : "hidden lg:flex flex-col gap-3 items-start pt-[86px] shrink-0"
      }
    >
      {(variant === "mobile" ? shareLinksMobile : shareLinks).map((share) => (
        <button
          key={share.label}
          type="button"
          aria-label={share.label}
          className={`flex items-center justify-center rounded-full shrink-0 ${
            variant === "mobile" ? "p-2" : "p-3"
          } ${share.variant === "dark" ? "bg-[#3abdaa]" : "bg-white border border-[#e7e7ea]"}`}
        >
          <Image
            src={share.icon}
            alt=""
            width={32}
            height={32}
            className={`shrink-0 ${variant === "mobile" ? "size-6" : "size-8"}`}
          />
        </button>
      ))}
    </div>
  );
}

export function HeroDetailSection({
  post,
  children,
}: {
  post: BlogPost;
  children: React.ReactNode;
}) {
  return (
    <Container className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-5 items-center w-full lg:gap-8">
        <div className="flex flex-col gap-4 items-start w-full lg:gap-7 lg:items-center">
          <h1 className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] text-left w-full lg:text-center lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px] lg:max-w-[890px]">
            {post.title}
          </h1>
          <div className="flex gap-2 items-center flex-wrap lg:justify-center">
            <div className="flex gap-1.5 items-center lg:gap-2.5">
              <Image src="/icons/clock9.svg" alt="" width={20} height={20} className="size-4 lg:size-5" />
              <p className="font-medium text-[#4d4d4b] text-xs whitespace-nowrap lg:text-sm">
                {post.readTime}
              </p>
            </div>
            <div className="bg-[#989898] rounded-full shrink-0 size-1" />
            <div className="flex gap-1 items-center font-medium text-[#4d4d4b] text-xs whitespace-nowrap lg:text-sm">
              <p>Dərc edildi:</p>
              <p>{post.dateLabel}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start justify-center w-full">
          <ShareButtons variant="desktop" />

          <div className="flex flex-col gap-5 items-start flex-1 min-w-0 max-w-[1000px] w-full lg:gap-8">
            <div className="border border-[#f2f4f8] h-[212px] relative rounded-2xl w-full overflow-hidden lg:h-[600px]">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 1000px, 100vw"
                  priority
                />
              )}
            </div>

            <div className="flex lg:hidden gap-3 items-center">
              <p className="font-medium text-[#4d4d4b] text-sm whitespace-nowrap">Paylaş:</p>
              <ShareButtons variant="mobile" />
            </div>

            {children}
          </div>
        </div>
      </div>
    </Container>
  );
}
