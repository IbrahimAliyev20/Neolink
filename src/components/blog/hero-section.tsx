"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

import Container from "@/components/shared/container";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";
import type { BlogPost } from "@/lib/data/blogs";

export function HeroSection({ featuredPost }: { featuredPost: BlogPost | undefined }) {
  const t = useTranslations("blog.hero");
  const rootRef = useRef<HTMLDivElement | null>(null);

  // On-load intro, like the projects hero — not a scroll-scrubbed reveal, since
  // at the top of the page a scrub reveal is already "complete" at scroll 0 and
  // never visibly plays. The headline (static text) unrolls line by line and the
  // description rises. Held hidden via `[data-hero-anim]` in globals.css. Runs
  // on mount.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(
        root.querySelectorAll("[data-hero-anim]:not([data-feat-media])"),
        { opacity: 1 }
      );
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

      gsap.fromTo(
        "[data-hero-anim]:not([data-hero-title]):not([data-feat-media])",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.3 }
      );
    }, root);

    return () => ctx.kill();
  }, []);

  // The featured card comes from the API, so it mounts after this hero — a
  // separate effect keyed on its slug wipes it in whenever it arrives (or
  // changes). Using `fromTo` here too means a remount can never strand it at its
  // hidden start.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = root.querySelector<HTMLElement>("[data-feat-media]");
    if (!media) return;

    if (prefersReducedMotion()) {
      gsap.set(media, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        media,
        { opacity: 0, scale: 1.06, clipPath: "inset(0% 100% 0% 0%)" },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power2.out",
        }
      );
    }, root);

    return () => ctx.kill();
  }, [featuredPost?.slug]);

  return (
    <Container className="w-full">
      <div
        ref={rootRef}
        className="flex flex-col gap-5 lg:flex-row lg:gap-10 items-center justify-between w-full"
      >
        <div className="flex flex-col gap-3 items-start w-full lg:gap-5 lg:w-[560px]">
          <h1
            data-hero-anim
            data-hero-title
            className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] w-full lg:text-[48px] lg:leading-[64px] lg:tracking-normal"
          >
            {t("heading")}
          </h1>
          <p
            data-hero-anim
            className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px]"
          >
            {t("desc")}
          </p>
        </div>

        {featuredPost && <FeaturedPost post={featuredPost} />}
      </div>
    </Container>
  );
}
