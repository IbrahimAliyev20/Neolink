"use client";

import { useEffect, useRef } from "react";

import { MagneticLink } from "@/components/animation/magnetic-link";
import { StatCard } from "@/components/home/stat-card";
import Container from "@/components/shared/container";
import { gsap, prefersReducedMotion, SplitText } from "@/lib/gsap";

/**
 * Figma desktop: `Frame 1` (1920x997, padding-x 240 → 1440 content column);
 * `Frame 8` sits at y=467, is 440 tall, so the frame closes with 90px below it.
 * The build keeps the 90px bottom gap but sizes the section to the viewport
 * instead of the Figma height, so the hero always ends exactly at the fold.
 * Figma mobile: `Banner-hero` (375x369) — py 24 / px 16, single column with a
 * 32 gap, copy + buttons on top and the three 109x105 stat cards in one row.
 */
export function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  // Opening timeline: the background settles while the copy, the buttons and
  // then the stat cards arrive. Elements start hidden via `[data-hero-anim]`
  // in globals.css so nothing flashes before hydration. It runs once, on load.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero-anim], .js-hero-stat"), {
        opacity: 1,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // The headline unrolls line by line from behind a mask. `autoSplit` waits
      // for the webfont and re-splits on resize, so the lines always match the
      // rendered wrap.
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
        .from(".js-hero-video", { scale: 1.06, duration: 1.6, ease: "power2.out" }, 0)
        .fromTo(
          "[data-hero-anim]:not([data-hero-title])",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
          0.45
        )
        .fromTo(
          ".js-hero-stat",
          { opacity: 0, x: 24, filter: "blur(6px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.45"
        );
    }, root);

    return () => ctx.kill();
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero-scale relative w-full overflow-hidden bg-white"
    >
      <video
        src="/bg-video/260601_0002_image_to_video_1812.mp4"
        poster="/images/hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="js-hero-video pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom select-none"
      />

      {/* On desktop the hero fills exactly what is left of the viewport under
          the 96px sticky header, whatever the screen height. The copy is
          bottom-aligned and the video is `object-bottom`, so a shorter screen
          simply crops more off the top of the frame instead of squashing it.
          `min-h` rather than `h`, so unusually tall content can still grow. */}
      <Container className="relative flex flex-col justify-end py-6 lg:min-h-[calc(100dvh-97px)] lg:pt-[calc(var(--hero-u)*96)] lg:pb-[calc(var(--hero-u)*90)] 2xl:px-0">
        {/* Figma: Frame 8 — mobile column gap 32; desktop row, gap 220, bottom aligned */}
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-[15.28%]">
          {/* Figma: Frame 3 — mobile gap 20, desktop gap 72 / width 696 */}
          <div className="flex w-full min-w-0 flex-col gap-5 lg:w-[48.33%] lg:gap-[calc(var(--hero-u)*72)]">
            {/* Figma: Frame 2 — mobile gap 20, desktop gap 24 */}
            <div className="flex flex-col gap-5 lg:gap-[calc(var(--hero-u)*24)]">
              <h1 data-hero-anim data-hero-title className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:text-[36px] md:leading-[46px] lg:text-[calc(var(--hero-u)*64)] lg:leading-[calc(var(--hero-u)*80)] lg:tracking-[0]">
                Biznesinizi Gələcəyin{" "}
                <span className="text-neo-teal">Rəqəmsal</span> Həlləri ilə
                Gücləndiririk
              </h1>
              <p data-hero-anim className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px] lg:text-[calc(var(--hero-u)*20)] lg:leading-[calc(var(--hero-u)*28)]">
                Lorem ipsum dolor sit amet consectetur. Fusce elit molestie in
                mi amet. Feugiat ultrices eu gravida pellentesque risus eleifend
                ullamcorper.
              </p>
            </div>

            {/* Figma: Frame 7 — row, gap 20; buttons 161.5x40 mobile, 265.585x48 desktop */}
            <div data-hero-anim className="flex gap-5 lg:gap-[calc(var(--hero-u)*20)]">
              <MagneticLink
                href="/contact"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-neo-teal px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-neo-teal/90 lg:h-[calc(var(--hero-u)*48)] lg:w-[calc(var(--hero-u)*265.59)] lg:flex-none lg:px-[calc(var(--hero-u)*24)] lg:text-[calc(var(--hero-u)*16)] lg:leading-[calc(var(--hero-u)*24)]"
              >
                Bizimlə əlaqə
              </MagneticLink>
              <MagneticLink
                href="/services"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-white px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-neo-ink transition-colors hover:bg-white/90 lg:h-[calc(var(--hero-u)*48)] lg:w-[calc(var(--hero-u)*265.59)] lg:flex-none lg:px-[calc(var(--hero-u)*24)] lg:text-[calc(var(--hero-u)*16)] lg:leading-[calc(var(--hero-u)*24)]"
              >
                Xidmətlərimiz
              </MagneticLink>
            </div>
          </div>

          {/* Figma: Frame 6 — mobile one row of three (gap 7), desktop column
              gap 10 with the first card on its own line, right aligned. */}
          <div className="flex w-full min-w-0 gap-[7px] lg:w-[36.39%] lg:flex-col lg:items-end lg:gap-[calc(var(--hero-u)*10)]">
            <StatCard
              className="js-hero-stat order-1 flex-1 lg:order-none lg:w-full lg:flex-none"
              value="15+"
              label="Sahə Üzrə Ekspert"
            />
            {/* `contents` lets both cards join the mobile row; at lg this
                becomes Figma's `Frame 5` (row, gap 10). */}
            <div className="contents lg:flex lg:w-full lg:items-center lg:justify-end lg:gap-[calc(var(--hero-u)*10)]">
              <StatCard
                className="js-hero-stat order-3 flex-1 lg:order-none"
                value="40+"
                label="Uğurla Tamamlanmış Layihə"
              />
              <StatCard
                accent
                className="js-hero-stat order-2 flex-1 lg:order-none"
                value="98%"
                label="Müştəri Məmnuniyyəti"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
