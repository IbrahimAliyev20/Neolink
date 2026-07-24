"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/container";
import { OfferModal } from "@/components/shared/OfferModal";
import { Parallax } from "@/components/animation/parallax";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";
import type { ServiceImage } from "@/lib/data/services";

export interface ServiceHero {
  slug: string;
  title: string;
  description: string;
  heroImage: ServiceImage;
}

export function HeroDetailSection({ service }: { service: ServiceHero }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  // This is the top-of-page section, so it plays once on load — not on scroll.
  // A scroll-scrubbed reveal would already be "complete" at scroll 0 (the
  // element sits above the trigger line before you ever scroll), so it would
  // never visibly animate. Instead the headline unrolls line by line while the
  // image wipes in and the copy + CTA rise. Elements start hidden via
  // `[data-hero-anim]` in globals.css so nothing flashes before hydration.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero-anim]"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const title = root.querySelector<HTMLElement>("[data-hero-title]");
      if (title) {
        SplitText.create(title, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(title, { opacity: 1 });
            return gsap.from(self.lines, {
              yPercent: 100,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              delay: 0.15,
            });
          },
        });
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-media]",
          { opacity: 0, scale: 1.06, clipPath: "inset(0% 100% 0% 0%)" },
          { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.out" },
          0.1
        )
        .fromTo(
          "[data-hero-anim]:not([data-hero-title]):not([data-hero-media])",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          0.4
        );
    }, root);

    return () => ctx.kill();
  }, [service.slug]);

  return (
    <section ref={rootRef} className="w-full">
      <Container className="flex flex-col items-start w-full">
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-16 xl:gap-[132px] items-center w-full">
          <div className="flex flex-col gap-5 items-start w-full lg:gap-12 lg:flex-1 lg:min-w-0">
            <div className="flex flex-col gap-3 items-start w-full lg:gap-6">
              <h1
                data-hero-anim
                data-hero-title
                className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]"
              >
                {service.title}
              </h1>
              <p
                data-hero-anim
                className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]"
              >
                {service.description}
              </p>
            </div>
            <div data-hero-anim className="flex gap-5 items-start w-full">
              <button
                type="button"
                onClick={() => setIsOfferModalOpen(true)}
                className="bg-[#3abdaa] flex gap-4 h-10 items-center justify-center px-6 py-2.5 rounded-full w-full lg:gap-2 lg:h-12 lg:px-16 lg:py-3 lg:w-auto"
              >
                <span className="font-medium text-white text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                  Təklif al
                </span>
                <ArrowUpRight className="h-5 w-5 text-white" strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div
            data-hero-anim
            data-hero-media
            className="border border-[#e7e7ea] h-[247px] relative rounded-2xl w-full overflow-hidden lg:h-[474px] lg:rounded-[20px] lg:flex-1 lg:min-w-0"
          >
            <Parallax amount={26} className="absolute inset-x-0 -inset-y-[18%]">
              <Image
                src={service.heroImage}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </Parallax>
          </div>
        </div>

        <OfferModal
          open={isOfferModalOpen}
          onClose={() => setIsOfferModalOpen(false)}
          service={service.title}
        />
      </Container>
    </section>
  );
}
