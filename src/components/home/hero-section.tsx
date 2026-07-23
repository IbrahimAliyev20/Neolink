import Link from "next/link";

import { StatCard } from "@/components/home/stat-card";
import Container from "@/components/shared/container";

/**
 * Figma desktop: `Frame 1` (1920x997, padding-x 240 → 1440 content column);
 * `Frame 8` sits at y=467, is 440 tall, so the frame closes with 90px below it.
 * Figma mobile: `Banner-hero` (375x369) — py 24 / px 16, single column with a
 * 32 gap, copy + buttons on top and the three 109x105 stat cards in one row.
 */
export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <video
        src="/bg-video/260601_0002_image_to_video_1812.mp4"
        poster="/images/hero-bg.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom select-none"
      />

      <Container className="relative flex flex-col justify-end py-6 lg:min-h-[51.93vw] lg:pt-[24.32vw] lg:pb-[4.69vw] 2xl:min-h-[997px] 2xl:px-0 2xl:pt-[467px] 2xl:pb-[90px]">
        {/* Figma: Frame 8 — mobile column gap 32; desktop row, gap 220, bottom aligned */}
        <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:gap-[15.28%]">
          {/* Figma: Frame 3 — mobile gap 20, desktop gap 72 / width 696 */}
          <div className="flex w-full min-w-0 flex-col gap-5 lg:w-[48.33%] lg:gap-[72px]">
            {/* Figma: Frame 2 — mobile gap 20, desktop gap 24 */}
            <div className="flex flex-col gap-5 lg:gap-6">
              <h1 className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:text-[36px] md:leading-[46px] lg:text-[64px] lg:leading-[80px] lg:tracking-[0]">
                Biznesinizi Gələcəyin{" "}
                <span className="text-neo-teal">Rəqəmsal</span> Həlləri ilə
                Gücləndiririk
              </h1>
              <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px] lg:text-[20px] lg:leading-[28px]">
                Lorem ipsum dolor sit amet consectetur. Fusce elit molestie in
                mi amet. Feugiat ultrices eu gravida pellentesque risus eleifend
                ullamcorper.
              </p>
            </div>

            {/* Figma: Frame 7 — row, gap 20; buttons 161.5x40 mobile, 265.585x48 desktop */}
            <div className="flex gap-5">
              <Link
                href="/contact"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-neo-teal px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-neo-teal/90 lg:h-12 lg:flex-none lg:w-[265.59px] lg:text-[16px] lg:leading-[24px]"
              >
                Bizimlə əlaqə
              </Link>
              <Link
                href="/services"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-white px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-neo-ink transition-colors hover:bg-white/90 lg:h-12 lg:flex-none lg:w-[265.59px] lg:text-[16px] lg:leading-[24px]"
              >
                Xidmətlərimiz
              </Link>
            </div>
          </div>

          {/* Figma: Frame 6 — mobile one row of three (gap 7), desktop column
              gap 10 with the first card on its own line, right aligned. */}
          <div className="flex w-full min-w-0 gap-[7px] lg:w-[36.39%] lg:flex-col lg:items-end lg:gap-[10px]">
            <StatCard
              className="order-1 flex-1 lg:order-none lg:w-full lg:flex-none"
              value="15+"
              label="Sahə Üzrə Ekspert"
            />
            {/* `contents` lets both cards join the mobile row; at lg this
                becomes Figma's `Frame 5` (row, gap 10). */}
            <div className="contents lg:flex lg:w-full lg:items-center lg:justify-end lg:gap-[10px]">
              <StatCard
                className="order-3 flex-1 lg:order-none"
                value="40+"
                label="Uğurla Tamamlanmış Layihə"
              />
              <StatCard
                accent
                className="order-2 flex-1 lg:order-none"
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
