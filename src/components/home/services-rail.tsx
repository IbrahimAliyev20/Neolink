"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

const ACTIVE = { backgroundColor: "#3abdaa", color: "#ffffff" };

/**
 * Figma: `Services-numbers` — 36px circles mobile / 72px desktop, joined by 1px
 * connectors. The connectors draw themselves and each circle fills teal as the
 * section scrolls, so the rail reads as a progress indicator.
 */
export function ServicesRail({ count }: { count: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const circles = root.querySelectorAll<HTMLElement>("[data-rail-circle]");
    const lines = root.querySelectorAll<HTMLElement>("[data-rail-line]");

    if (prefersReducedMotion()) {
      gsap.set(lines, { scaleY: 1 });
      gsap.set(circles, ACTIVE);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lines, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 65%",
          end: "bottom 75%",
          scrub: 0.6,
        },
      });

      circles.forEach((circle, index) => {
        tl.to(circle, { ...ACTIVE, duration: 0.3 });
        if (lines[index]) tl.to(lines[index], { scaleY: 1, duration: 1 });
      });
    }, root);

    return () => ctx.kill();
  }, [count]);

  return (
    <div
      ref={rootRef}
      className="flex w-9 shrink-0 flex-col items-center gap-4 lg:w-14 2xl:w-[72px]"
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col items-center gap-4">
          <span
            data-rail-circle
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neo-teal text-[16px] leading-[24px] font-medium tracking-[0.01em] text-neo-teal lg:h-14 lg:w-14 lg:text-[24px] lg:leading-[32px] 2xl:h-[72px] 2xl:w-[72px] 2xl:text-[32px] 2xl:leading-[40px]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            data-rail-line
            aria-hidden
            className="h-[75px] w-px rounded-[20px] bg-[#7bd3c6] lg:h-[85px] 2xl:h-[97.75px]"
          />
        </div>
      ))}
    </div>
  );
}
