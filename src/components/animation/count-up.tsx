"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Counts a stat up when it scrolls into view. Takes the finished label
 * ("15+", "98%") and animates only its leading number, so the suffix and the
 * server-rendered text stay exactly as designed.
 */
export function CountUp({
  value,
  delay = 0,
  duration = 1.4,
}: {
  value: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/^(\d+)(.*)$/);
    if (!match || prefersReducedMotion()) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        value: target,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.value)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    }, el);

    return () => ctx.kill();
  }, [value, delay, duration]);

  return <span ref={ref}>{value}</span>;
}
