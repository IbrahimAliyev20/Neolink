"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";

/**
 * Unrolls a heading line by line from behind a mask, scrubbed to the scroll
 * position like the other reveals.
 *
 * The wrapper is `display: contents`, so it adds no box and the heading keeps
 * whatever place it had in its flex/grid parent. `autoSplit` waits for the
 * webfont and re-splits on resize, so the lines always match the real wrap.
 */
export function SplitLines({
  children,
  /** Scroll position where the first line starts moving. */
  start = "top 88%",
  /** Scroll position where the last line has landed. */
  end = "top 55%",
}: {
  children: ReactNode;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = ref.current?.firstElementChild as HTMLElement | null;
    if (!target) return;

    if (prefersReducedMotion()) {
      gsap.set(target, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      SplitText.create(target, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(target, { opacity: 1 });
          return gsap.from(self.lines, {
            yPercent: 115,
            ease: "none",
            stagger: 0.35,
            scrollTrigger: { trigger: target, start, end, scrub: 0.6 },
          });
        },
      });
    }, target);

    return () => ctx.kill();
  }, [start, end]);

  return (
    <div ref={ref} data-split-lines className="contents">
      {children}
    </div>
  );
}
