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

  // A new page's scroll triggers are created while the view transition is still
  // painting the old snapshot over the new page (`::view-transition-new(root)`
  // in globals.css runs ~340ms with opacity + translateY). Measured then, every
  // trigger's start/end is wrong, so the reveals stay stuck at their hidden
  // start and no amount of scrolling advances them — until a hard reload, which
  // has no transition and measures cleanly. The fix is to re-measure *after* the
  // transition actually finishes, not on a guessed delay.
  useEffect(() => {
    const el = ref.current;
    const refresh = () => ScrollTrigger.refresh();
    const timers: number[] = [];

    const raf = requestAnimationFrame(() => {
      // Wait on the real `::view-transition` animations so the re-measure lands
      // exactly when the page has settled. Filter to those pseudo-elements only
      // — the site also runs infinite marquee animations whose `finished` never
      // resolves, and awaiting those would hang forever.
      const vtAnimations =
        typeof document !== "undefined" && "getAnimations" in document
          ? document.getAnimations().filter((animation) => {
              const pseudo = (animation.effect as KeyframeEffect | null)
                ?.pseudoElement;
              return pseudo?.startsWith("::view-transition");
            })
          : [];

      if (vtAnimations.length > 0) {
        Promise.allSettled(vtAnimations.map((a) => a.finished)).then(refresh);
      }

      // Immediate + short follow-ups cover the no-transition path (unsupported
      // browsers, reduced motion) and async lists like the projects grid that
      // mount after their fetch resolves.
      refresh();
      timers.push(window.setTimeout(refresh, 300), window.setTimeout(refresh, 900));
    });

    // Re-measure as each already-mounted image lands, in case a reveal's height
    // depended on it.
    const imgs = el ? Array.from(el.querySelectorAll("img")) : [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", refresh);
    });

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      imgs.forEach((img) => img.removeEventListener("load", refresh));
    };
  }, []);

  return (
    <ViewTransition>
      <div ref={ref}>{children}</div>
    </ViewTransition>
  );
}
