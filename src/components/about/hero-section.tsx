"use client";

import { useEffect, useRef } from "react";

import Container from "@/components/shared/container";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";
import { useAbout } from "@/services/about/queries";

export function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { data: about, isLoading } = useAbout();

  // On-load intro, like the projects hero — not a scroll-scrubbed reveal. This
  // is the top of the page, so a scrub reveal would already be "complete" at
  // scroll 0 and never visibly play. The headline unrolls line by line while
  // the description rises. Elements are held hidden via `[data-hero-anim]` in
  // globals.css so nothing flashes before it runs, and it waits for the API
  // text so SplitText splits the final copy rather than the fallback.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || isLoading) return;

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

      // Explicit `fromTo` (never `from`) so a client-nav remount can't strand
      // the copy at opacity 0.
      gsap.fromTo(
        "[data-hero-anim]:not([data-hero-title])",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, root);

    return () => ctx.kill();
  }, [isLoading]);

  return (
    <Container className="flex flex-col items-center w-full">
      <div
        ref={rootRef}
        className="flex flex-col gap-3 items-start w-full lg:flex-row lg:justify-between lg:gap-10"
      >
        <h1
          data-hero-anim
          data-hero-title
          className="font-semibold text-[#1c1c1e] text-[20px] leading-7 tracking-[0.2px] w-full lg:text-[48px] lg:leading-[64px] lg:tracking-normal lg:max-w-[424px] lg:shrink-0"
        >
          {about?.title ?? "Bizi Yaxından Tanıyın"}
        </h1>
        <p
          data-hero-anim
          className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px] lg:max-w-[739px] lg:flex-1 lg:min-w-0"
        >
          {about?.description ??
            "Neoline müasir bizneslərin rəqəmsal inkişafını dəstəkləyən innovativ proqram təminatı şirkətidir. Biz müəssisələrin ehtiyaclarına uyğun veb platformalar, mobil tətbiqlər, korporativ sistemlər və fərdi proqram həlləri hazırlayırıq. Məqsədimiz texnologiyanı sadəcə alət kimi deyil, bizneslərin inkişafına töhfə verən strateji dəyər kimi təqdim etməkdir."}
        </p>
      </div>
    </Container>
  );
}
