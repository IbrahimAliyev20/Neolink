"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

const OPEN = "inset(0% 0% 0% 0%)";
const CLOSED = "inset(0% 100% 0% 0%)";

/**
 * Wipes an image into view with a clip-path instead of a fade. Like `Reveal`
 * the wipe is scrubbed, so it follows the scroll position in both directions
 * without ever re-triggering.
 */
export function ClipReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { clipPath: OPEN });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: CLOSED },
        {
          clipPath: OPEN,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 65%",
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => ctx.kill();
  }, []);

  return (
    <div ref={ref} data-clip-reveal className={className}>
      {children}
    </div>
  );
}
