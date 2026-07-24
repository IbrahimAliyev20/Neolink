"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";

export function HeroSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // On-load intro, like the other page heroes — not a scroll-scrubbed reveal,
  // since at the top of the page a scrub reveal is already "complete" at scroll
  // 0 and never visibly plays. The headline unrolls line by line while the
  // description rises. Held hidden via `[data-hero-anim]` in globals.css. The
  // copy is static, so it runs on mount with no data gate.
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

      // Explicit `fromTo` (never `from`) so a client-nav remount can't strand
      // the description at opacity 0.
      gsap.fromTo(
        "[data-hero-anim]:not([data-hero-title])",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.35 }
      );
    }, root);

    return () => ctx.kill();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-3 items-center text-center max-w-[343px] px-4 lg:gap-5 lg:max-w-[566px]"
    >
      <h1
        data-hero-anim
        data-hero-title
        className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]"
      >
        Xidmətlərimizlə Yaxından Tanış Olun
      </h1>
      <p
        data-hero-anim
        className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]"
      >
        Böyüyən B2B şirkətləri üçün nəzərdə tutulmuş korporativ səviyyəli tam İT xidmətləri
        – hamısı bir mərkəzdən
      </p>
    </div>
  );
}
