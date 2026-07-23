"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Page transition. Unlike `layout.tsx`, a template remounts on every
 * navigation, so this wrapper is a natural hook for an enter animation — the
 * header and footer stay put while the page content fades up.
 *
 * The hidden starting state lives in `globals.css` (`[data-page-transition]`)
 * so the old page never flashes in its final position first.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: () => {
            // Drop the transform so nothing inside sits in a transformed
            // ancestor, then let the scroll triggers re-measure the new page.
            gsap.set(el, { clearProps: "transform" });
            ScrollTrigger.refresh();
          },
        }
      );
    }, el);

    return () => ctx.kill();
  }, []);

  return (
    <div ref={ref} data-page-transition>
      {children}
    </div>
  );
}
