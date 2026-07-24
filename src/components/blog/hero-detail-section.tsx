"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import Container from "@/components/shared/container";
import { Reveal } from "@/components/animation/reveal";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";
import type { BlogPost } from "@/lib/data/blogs";

const shareLinks = [
  { icon: "/icons/brand-instagram.svg", key: "instagram", action: "instagram" as const },
  { icon: "/icons/link.svg", key: "copy", action: "copy" as const },
  { icon: "/icons/brand-facebook.svg", key: "facebook", action: "facebook" as const },
  { icon: "/icons/twitter-x.svg", key: "x", action: "x" as const },
];

function handleShare(
  action: (typeof shareLinks)[number]["action"],
  copyMessages: { success: string; error: string }
) {
  const url = window.location.href;

  switch (action) {
    case "copy":
      navigator.clipboard
        .writeText(url)
        .then(() => toast.success(copyMessages.success))
        .catch(() => toast.error(copyMessages.error));
      break;
    case "facebook":
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer"
      );
      break;
    case "x":
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer"
      );
      break;
    case "instagram":
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      break;
  }
}

function ShareButtons({ variant }: { variant: "mobile" | "desktop" }) {
  const t = useTranslations("blog.detail");
  const copyMessages = { success: t("copySuccess"), error: t("copyError") };
  return (
    <div
      className={
        variant === "mobile"
          ? "flex lg:hidden gap-1 items-center"
          : "hidden lg:flex flex-col gap-3 items-start shrink-0 sticky top-28 self-start"
      }
    >
      {shareLinks.map((share) => {
        // Figma: the 32px (24px on mobile) icon box holds the glyph at a
        // 16.67% inset. Most of our SVGs are cropped to the bare glyph, so
        // they render smaller inside the box; twitter-x.svg already carries
        // its own internal margins and fills the box directly.
        const fillsBox = share.icon.includes("twitter");

        return (
          <button
            key={share.key}
            type="button"
            aria-label={t(share.key)}
            onClick={() => handleShare(share.action, copyMessages)}
            className={`group flex items-center justify-center rounded-full shrink-0 cursor-pointer transition-colors bg-white border border-[#e7e7ea] hover:bg-[#3abdaa] hover:border-[#3abdaa] ${
              variant === "mobile" ? "p-2" : "p-3"
            }`}
          >
            <span
              className={`flex items-center justify-center shrink-0 ${
                variant === "mobile" ? "size-6" : "size-8"
              }`}
            >
              <Image
                src={share.icon}
                alt=""
                width={32}
                height={32}
                className={`shrink-0 transition-[filter] group-hover:brightness-0 group-hover:invert ${
                  fillsBox
                    ? variant === "mobile"
                      ? "size-6"
                      : "size-8"
                    : variant === "mobile"
                      ? "size-4"
                      : "size-[21px]"
                }`}
              />
            </span>
          </button>
        );
      })}
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
  const t = useTranslations("blog.detail");
  const rootRef = useRef<HTMLDivElement | null>(null);

  // On-load intro for the top of the article — the page only renders this once
  // the blog has loaded, so `post` is always present here (no data gate needed).
  // The headline unrolls line by line, the meta rises and the cover wipes in.
  // Held hidden via `[data-hero-anim]` in globals.css so nothing flashes first.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero-anim]"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const title = root.querySelector<HTMLElement>("[data-hero-title]");
      if (title) {
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(title, { opacity: 1 });
            return gsap.from(self.lines, {
              yPercent: 100,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              delay: 0.15,
            });
          },
        });
      }

      // Explicit `fromTo` everywhere (never `from`) so a client-nav remount
      // can't strand these at their hidden start.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-media]",
          { opacity: 0, scale: 1.06, clipPath: "inset(0% 100% 0% 0%)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power2.out",
          },
          0.2
        )
        .fromTo(
          "[data-hero-anim]:not([data-hero-title]):not([data-hero-media])",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          0.15
        );
    }, root);

    return () => ctx.kill();
  }, []);

  return (
    <Container className="flex flex-col items-center w-full">
      <div ref={rootRef} className="flex flex-col gap-5 items-center w-full lg:gap-8">
        <div className="flex gap-1 items-center w-full">
          <Link href="/blogs" className="text-[#4d4d4b] text-xs hover:text-[#3abdaa] transition-colors">
            {t("breadcrumb")}
          </Link>
          <ChevronRight className="h-4 w-4 text-[#989898]" strokeWidth={1.5} />
          <p className="font-medium text-[#040711] text-xs truncate max-w-[400px]">
            {post.title}
          </p>
        </div>
        <div className="flex flex-col gap-4 items-start w-full lg:gap-7 lg:items-center">
          <h1
            data-hero-anim
            data-hero-title
            className="font-semibold text-[#040711] text-xl leading-7 tracking-[0.2px] text-left w-full lg:text-center lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px] lg:max-w-[890px]"
          >
            {post.title}
          </h1>
          {(post.readTime || post.dateLabel) && (
            <div data-hero-anim className="flex gap-2 items-center flex-wrap lg:justify-center">
              {post.readTime && (
                <div className="flex gap-1.5 items-center lg:gap-2.5">
                  <Image src="/icons/clock9.svg" alt="" width={20} height={20} className="size-4 lg:size-5" />
                  <p className="font-medium text-[#4d4d4b] text-xs whitespace-nowrap lg:text-sm">
                    {post.readTime}
                  </p>
                </div>
              )}
              {post.readTime && post.dateLabel && (
                <div className="bg-[#989898] rounded-full shrink-0 size-1" />
              )}
              {post.dateLabel && (
                <div className="flex gap-1 items-center font-medium text-[#4d4d4b] text-xs whitespace-nowrap lg:text-sm">
                  <p>{t("published")}</p>
                  <p>{post.dateLabel}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-start justify-center w-full">
          <ShareButtons variant="desktop" />

          <div className="flex flex-col gap-5 items-start flex-1 min-w-0 max-w-[1000px] w-full lg:gap-8">
            <div
              data-hero-anim
              data-hero-media
              className="border border-[#f2f4f8] h-[212px] relative rounded-2xl w-full overflow-hidden lg:h-[600px]"
            >
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

            <div data-hero-anim className="flex lg:hidden gap-3 items-center">
              <p className="font-medium text-[#4d4d4b] text-sm whitespace-nowrap">{t("share")}</p>
              <ShareButtons variant="mobile" />
            </div>

            {/* The article body sits below the fold, so it fades up on scroll
                rather than in the opening timeline. */}
            <Reveal y={44} blur={8} className="w-full">
              {children}
            </Reveal>
          </div>
        </div>
      </div>
    </Container>
  );
}
