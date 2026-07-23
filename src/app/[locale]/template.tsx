"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

import { ViewTransition } from "@/components/animation/view-transition";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

// Runs before paint on the client, so the fallback never flashes its end state.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Page transition. A template remounts on every navigation, unlike a layout, so
 * this is the natural hook for it — the header and footer stay put while the
 * page content swaps.
 *
 * The transition itself is the browser's View Transitions API, driven by React
 * (see `globals.css` for the `::view-transition-*` timing). Browsers without it
 * fall back to a GSAP fade-up, so every visitor gets some motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const supportsViewTransitions =
      typeof document !== "undefined" && "startViewTransition" in document;

    if (supportsViewTransitions || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y: 18,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          // Drop the transform so nothing inside sits in a transformed
          // ancestor, then let the scroll triggers re-measure the new page.
          gsap.set(el, { clearProps: "transform" });
          ScrollTrigger.refresh();
        },
      });
    }, el);

    return () => ctx.kill();
  }, []);

  // The new page's triggers are created against a document that the view
  // transition is still painting over; re-measure once it has settled.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <ViewTransition>
      <div ref={ref}>{children}</div>
    </ViewTransition>
  );
}
