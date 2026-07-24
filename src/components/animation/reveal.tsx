"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion, scheduleRefresh } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  /** Applied to the wrapper, so this can replace an existing layout div. */
  className?: string;
  /** Distance in px the element travels vertically into place. */
  y?: number;
  /** Distance in px it travels horizontally; negative comes from the left. */
  x?: number;
  /** Starting scale, eased back to 1. */
  scale?: number;
  /** Starting blur in px, eased back to 0. */
  blur?: number;
  /** When set, the direct children animate one after another. */
  stagger?: number;
  /** Scroll position where the entrance begins. */
  start?: string;
  /** Scroll position where it is fully in place. */
  end?: string;
};

/**
 * Scroll-linked reveal. The tween is scrubbed, so its state is purely a
 * function of the scroll position: scrolling down plays it in, scrolling up
 * unwinds it just as smoothly. Nothing is toggled, so there is no re-trigger,
 * no double play and no flicker.
 *
 * Replace an existing wrapper `div` with this and pass the same `className`, so
 * no extra node enters the layout. The hidden starting state lives in
 * `globals.css` (`[data-reveal] > *`) so nothing flashes before hydration.
 */
export function Reveal({
  children,
  className,
  y = 32,
  x = 0,
  scale = 1,
  blur = 0,
  stagger,
  start = "top 88%",
  end = "top 62%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // Lists that arrive from an API start empty, so the tween has to be built
  // again once the children show up — otherwise they keep the hidden state
  // that `globals.css` gives them.
  const childCount = Children.count(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The children move, never the wrapper: a trigger that shifts while it
    // animates would make ScrollTrigger recalculate its own start point.
    const targets = Array.from(el.children);
    if (targets.length === 0) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, x: 0, y: 0, scale: 1, filter: "none" });
      return;
    }

    const build = (travelX: number, travelY: number) =>
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: travelY,
          x: travelX,
          scale,
          ...(blur ? { filter: `blur(${blur}px)` } : {}),
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          ...(blur ? { filter: "blur(0px)" } : {}),
          ease: "none",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            // A little lag smooths out fast wheel jumps.
            scrub: 0.6,
          },
        }
      );

    // Sideways travel only on desktop: on a phone the offset sticks out past
    // the viewport and adds a horizontal scrollbar. Those reveals fall back to
    // a vertical one so they still animate.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      build(x, y);
    });
    mm.add("(max-width: 1023.98px)", () => {
      build(0, x !== 0 && y === 0 ? 32 : y);
    });

    // Re-measure once the page has settled — the trigger just built may have
    // measured mid-navigation (or before this list's data mounted).
    scheduleRefresh();

    return () => mm.revert();
  }, [y, x, scale, blur, stagger, start, end, childCount]);

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}
