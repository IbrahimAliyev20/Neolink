"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * A `next/link` that leans towards the cursor while hovered and springs back on
 * leave. It renders the same anchor with the same classes as a plain `Link`, so
 * it can replace one without touching the layout.
 */
export function MagneticLink({
  href,
  className,
  children,
  /** Share of the cursor offset the button follows. */
  strength = 0.3,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  strength?: number;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Coarse pointers have no hover, and a stuck offset would look broken.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      moveX((event.clientX - (rect.left + rect.width / 2)) * strength);
      moveY((event.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  return (
    <Link ref={ref} href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
