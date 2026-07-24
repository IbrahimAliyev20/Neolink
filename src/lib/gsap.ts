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

/**
 * Coalesced `ScrollTrigger.refresh()`. Scroll-linked reveals measure their
 * start/end when they mount, but on a client navigation that mount happens
 * while the page is still settling (the view transition is painting, and
 * API-driven lists mount after their fetch) — so the measurement is stale and
 * the reveal never advances, staying stuck at its hidden start until something
 * else (a resize) forces a re-measure. Each reveal calls this after it builds;
 * the calls in a frame collapse into one refresh on the next frame, once the
 * layout is real. Runs twice (next frame + a short delay) to also catch content
 * that lands a beat later.
 */
let refreshQueued = false;
export function scheduleRefresh() {
  if (typeof window === "undefined" || refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
    window.setTimeout(() => ScrollTrigger.refresh(), 250);
  });
}

/** Users who asked the OS for less motion get the final state, not the tween. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText };
