import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single entry point for GSAP so `ScrollTrigger` is registered exactly once and
 * every animation shares the same defaults. Import `gsap` from here, never
 * straight from the package, in anything that scroll-triggers.
 */
if (typeof window !== "undefined") {
  // registerPlugin is idempotent, so re-running this on a fast refresh is safe.
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: "power3.out", duration: 0.7 });

  // next/image swaps in real images after hydration, which moves every trigger
  // point below it — recalculate once everything has loaded.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/** Users who asked the OS for less motion get the final state, not the tween. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText };
