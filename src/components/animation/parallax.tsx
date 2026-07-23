"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Scrub-linked vertical drift for decorative imagery. Wrap the image and give
 * the wrapper vertical bleed so the travel never exposes an edge inside a
 * clipped card: the bleed on each side has to be at least half of `amount`
 * (e.g. `-inset-y-[18%]` covers `amount={26}`).
 */
export function Parallax({
  children,
  className,
  /** Total travel as a percentage of the wrapper height. */
  amount = 26,
  /** Optional starting scale, eased back to 1 across the same scroll range. */
  from,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 2, ...(from ? { scale: from } : {}) },
        {
          yPercent: amount / 2,
          ...(from ? { scale: 1 } : {}),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.kill();
  }, [amount, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
