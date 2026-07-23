"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  /** Applied to the wrapper, so this can replace an existing layout div. */
  className?: string;
  /** Distance in px the element travels up into place. */
  y?: number;
  delay?: number;
  /** When set, the direct children animate one after another. */
  stagger?: number;
  /** ScrollTrigger `start`; the default fires a bit before the top edge. */
  start?: string;
};

/**
 * Scroll-triggered fade-up. Replace an existing wrapper `div` with this and
 * pass the same `className`, so no extra node enters the layout.
 *
 * The hidden starting state lives in `globals.css` (`[data-reveal]`) so there
 * is no flash of the final position before hydration.
 */
export function Reveal({
  children,
  className,
  y = 32,
  delay = 0,
  stagger,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element | Element[] = stagger
      ? Array.from(el.children)
      : el;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);

    return () => ctx.kill();
  }, [y, delay, stagger, start]);

  return (
    <div
      ref={ref}
      data-reveal={stagger ? "stagger" : "self"}
      className={className}
    >
      {children}
    </div>
  );
}
