"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Counts a stat up when it scrolls into view. Takes the finished label
 * ("15+", "98%") and animates only its leading number, so the suffix and the
 * server-rendered text stay exactly as designed.
 *
 * `enabled` gates the start: pass `false` while the surrounding cards are still
 * hidden (e.g. the hero intro hasn't revealed them / the data isn't in yet), so
 * the count doesn't run behind an `opacity:0` card and finish before it shows.
 */
export function CountUp({
  value,
  delay = 0,
  duration = 1.6,
  enabled = true,
}: {
  value: string;
  delay?: number;
  duration?: number;
  enabled?: boolean;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);

    // Non-numeric value, reduced motion, or not ready yet → just show the final
    // text (no animation).
    if (!match || prefersReducedMotion() || !enabled) {
      el.textContent = value;
      return;
    }

    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { value: 0 };

    // Paint the starting number right away so the rise is always visibly from
    // zero — never a flash of the final value first.
    el.textContent = `0${suffix}`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        counter,
        { value: 0 },
        {
          value: target,
          duration,
          delay,
          ease: "power1.out",
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            // Replay from zero every time the number scrolls into view — on the
            // way down (onEnter) and back up (onEnterBack).
            toggleActions: "restart none restart none",
          },
        }
      );
    }, el);

    return () => ctx.kill();
  }, [value, delay, duration, enabled]);

  return <span ref={ref}>{value}</span>;
}
