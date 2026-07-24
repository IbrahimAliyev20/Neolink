"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";

/**
 * Figma desktop (node 3263:87776, 1920x521 canvas): four rotated project-card
 * thumbnails flank a centered title/description/CTA, with a hand-drawn arrow
 * pointing from the copy up to the button. The canvas renders at fixed 1:1
 * scale and is centered; narrower windows crop the side cards symmetrically,
 * so the hero looks identical at every desktop size. Below `lg` the Figma
 * mobile layout (node 3268:81608) takes over with literal mobile pixels.
 */
function RotatedCard({
  className,
  boxClassName,
  rotate,
  src,
  faded,
}: {
  className: string;
  boxClassName: string;
  rotate: string;
  src: string;
  faded?: boolean;
}) {
  return (
    <div data-hero-card className={`absolute ${className}`}>
      <div className="flex size-full items-center justify-center">
        <div
          className={`relative overflow-hidden rounded-2xl border border-[#f2f4f8] ${boxClassName} ${rotate} ${
            faded ? "opacity-12" : ""
          }`}
        >
          <Image src={src} alt="" fill className="object-cover" sizes="30vw" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const t = useTranslations("projects.hero");
  const tc = useTranslations("common");
  const rootRef = useRef<HTMLElement | null>(null);

  // Opening timeline, mirroring the home hero: the rotated cards pop in with a
  // scale + stagger while the headline unrolls line by line and the copy, CTA
  // and arrow rise into place. Elements that need to stay hidden until then are
  // held at opacity 0 via `[data-hero-anim]` in globals.css, so nothing flashes
  // before hydration. It runs once, on load.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero-anim]"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Only the layout that is actually on screen (mobile OR desktop) gets its
      // headline split — SplitText needs a laid-out element, and the hidden
      // variant has none.
      root.querySelectorAll<HTMLElement>("[data-hero-title]").forEach((title) => {
        if (!title.offsetParent) return;
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
      });

      // Explicit `fromTo` (never `from`) so a remount can't strand the cards.
      // `from` reads the element's *current* opacity as the destination, and on
      // a client navigation (or React's double-invoked effects) a killed tween
      // leaves that at 0 — so the next run animates 0 → 0 and the cards stay
      // invisible. The wrappers are always opacity 1 (the faded look lives on an
      // inner box), so 1 is the correct, stable end for every card.
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero-card]",
          { opacity: 0, scale: 0.85, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power2.out" },
          0
        )
        .fromTo(
          "[data-hero-anim]:not([data-hero-title])",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          0.45
        );
    }, root);

    return () => ctx.kill();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#f7f7f7]"
    >
      {/* Mobile / tablet (Figma node 3268:81608, 375 canvas): the desktop
          composition at literal mobile pixel sizes — small rotated corner
          cards peeking in from the edges, centered copy, arrow to the CTA. */}
      <div className="relative mx-auto h-[359px] w-full max-w-[375px] lg:hidden">
        <div data-hero-card className="absolute top-[5px] -left-[54px] flex h-[111.37px] w-[133px] items-center justify-center">
          <div className="relative h-[89.98px] w-[117.59px] shrink-0 -rotate-[11.36deg] overflow-hidden rounded-[10px] border border-[#f2f4f8]">
            <Image src="/images/projects/hero/card-2.jpg" alt="" fill className="object-cover" sizes="118px" />
          </div>
        </div>
        <div data-hero-card className="absolute top-[81px] -left-[10px] flex h-[54.02px] w-[65.73px] items-center justify-center">
          <div className="relative h-[45.55px] w-[59.53px] shrink-0 -rotate-[8.69deg] overflow-hidden rounded-lg border border-[#f2f4f8] opacity-12">
            <Image src="/images/projects/hero/card-1.jpg" alt="" fill className="object-cover" sizes="60px" />
          </div>
        </div>
        <div data-hero-card className="absolute top-[233px] left-[279.91px] flex h-[61.2px] w-[70.65px] items-center justify-center">
          <div className="relative h-[45.91px] w-[59.99px] shrink-0 rotate-[16.69deg] overflow-hidden rounded-lg border border-[#f2f4f8] opacity-12">
            <Image src="/images/projects/hero/card-3.jpg" alt="" fill className="object-cover" sizes="60px" />
          </div>
        </div>
        <div data-hero-card className="absolute top-[255px] left-[284px] flex h-[94.41px] w-[113.87px] items-center justify-center">
          <div className="relative h-[78.03px] w-[101.97px] shrink-0 rotate-[9.91deg] overflow-hidden rounded-[10px] border border-[#f2f4f8]">
            <Image src="/images/projects/hero/card-4.jpg" alt="" fill className="object-cover" sizes="102px" />
          </div>
        </div>

        <div className="absolute top-[93px] left-4 flex w-[343px] flex-col items-center gap-6">
          <div className="flex w-full flex-col items-center gap-3 text-center">
            <h1 data-hero-anim data-hero-title className="w-[294px] text-xl leading-7 font-semibold tracking-[0.2px] text-[#1c1c1e]">
              <span className="text-[#3abdaa]">{t("headingAccent")}</span> {t("headingRest")}
            </h1>
            <p data-hero-anim className="w-full text-xs leading-4 tracking-[0.12px] text-[#5b606f]">
              {t("desc")}
            </p>
          </div>

          <Link
            data-hero-anim
            href="/contact"
            className="flex h-10 w-[166px] items-center justify-center gap-4 rounded-full bg-[#0d153a] px-6 py-2.5 text-sm leading-5 font-medium tracking-[0.14px] text-white cursor-pointer transition-colors hover:bg-[#0d153a]/90"
          >
            {tc("getOffer")}
            <ArrowUpRight className="size-5" strokeWidth={1.5} />
          </Link>
        </div>

        <div data-hero-anim className="absolute top-[195.78px] left-[82.53px] flex h-[29.25px] w-[27.61px] items-center justify-center">
          <Image
            src="/images/projects/hero/arrow.svg"
            alt=""
            width={29}
            height={12}
            className="w-[28.95px] shrink-0 rotate-[48.77deg]"
          />
        </div>
      </div>

      {/* Desktop: the Figma 1920x521 canvas at fixed 1:1 scale, centered.
          Narrower windows crop the side cards symmetrically (section is
          overflow-hidden) instead of shrinking anything, so the hero looks
          identical at every window size. */}
      <div className="relative hidden h-[521px] w-full lg:block">
        <div className="absolute left-1/2 top-0 h-[521px] w-[1920px] -translate-x-1/2">
          <RotatedCard
            className="left-[393.33px] top-[344.57px] h-[160.15px] w-[194.85px]"
            boxClassName="h-[135.04px] w-[176.47px]"
            rotate="-rotate-[8.69deg]"
            src="/images/projects/hero/card-1.jpg"
            faded
          />
          <RotatedCard
            className="left-[260px] top-[141.64px] h-[330.16px] w-[394.28px]"
            boxClassName="h-[266.74px] w-[348.59px]"
            rotate="-rotate-[11.36deg]"
            src="/images/projects/hero/card-2.jpg"
          />
          <RotatedCard
            className="left-[1295.2px] top-[57px] h-[223.75px] w-[258.28px]"
            boxClassName="h-[167.83px] w-[219.32px]"
            rotate="rotate-[16.69deg]"
            src="/images/projects/hero/card-3.jpg"
            faded
          />
          <RotatedCard
            className="left-[1289.08px] top-[162px] h-[345.13px] w-[416.28px]"
            boxClassName="h-[285.25px] w-[372.76px]"
            rotate="rotate-[9.91deg]"
            src="/images/projects/hero/card-4.jpg"
          />

          <div className="absolute left-[650px] top-[145px] flex w-[620px] flex-col items-center gap-9">
            <div className="relative flex w-full flex-col items-center gap-5 text-center">
              <h1 data-hero-anim data-hero-title className="w-[592px] text-[48px] leading-[64px] font-semibold text-[#1c1c1e]">
                <span className="text-[#3abdaa]">{t("headingAccent")}</span> {t("headingRest")}
              </h1>
              <p data-hero-anim className="w-full text-base leading-6 tracking-[0.16px] text-[#5b606f]">
                {t("desc")}
              </p>

              <div data-hero-anim className="absolute left-[110.81px] top-[196px] flex h-[72.5px] w-[81.29px] items-center justify-center">
                <Image
                  src="/images/projects/hero/arrow.svg"
                  alt=""
                  width={79}
                  height={31}
                  className="w-[78.81px] shrink-0 rotate-[37.55deg]"
                />
              </div>
            </div>

            <Link
              data-hero-anim
              href="/contact"
              className="flex h-12 w-[248px] items-center justify-center gap-4 rounded-full bg-[#0d153a] px-6 text-base leading-6 font-medium tracking-[0.16px] text-white cursor-pointer transition-colors hover:bg-[#0d153a]/90"
            >
              {tc("getOffer")}
              <ArrowUpRight className="size-6" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
