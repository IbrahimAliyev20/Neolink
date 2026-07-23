import Link from "next/link";

import { StatCard } from "@/components/home/stat-card";
import Container from "@/components/shared/container";

/**
 * Figma: `Frame 1` (1920x997, padding-x 240 → 1440 content column).
 * `Frame 8` sits at y=467, is 440 tall, so the frame closes with 90px below it.
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

      <Container className="relative flex flex-col justify-end pt-[120px] pb-[80px] lg:min-h-[51.93vw] lg:pt-[24.32vw] lg:pb-[4.69vw] 2xl:min-h-[997px] 2xl:px-0 2xl:pt-[467px] 2xl:pb-[90px]">
        {/* Figma: Frame 8 — row, gap 220, align-items: flex-end, height 440 */}
        <div className="flex w-full flex-col items-start gap-16 lg:flex-row lg:items-end lg:gap-[15.28%]">
          {/* Figma: Frame 3 — column, gap 72, width 696 */}
          <div className="flex w-full min-w-0 flex-col gap-10 lg:w-[48.33%] lg:gap-[72px]">
            {/* Figma: Frame 2 — column, gap 24 */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <h1 className="text-[40px] leading-[52px] font-semibold tracking-[0] text-neo-ink md:text-[52px] md:leading-[66px] lg:text-[64px] lg:leading-[80px]">
                Biznesinizi Gələcəyin{" "}
                <span className="text-neo-teal">Rəqəmsal</span> Həlləri ilə
                Gücləndiririk
              </h1>
              <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted lg:text-[20px] lg:leading-[28px]">
                Lorem ipsum dolor sit amet consectetur. Fusce elit molestie in
                mi amet. Feugiat ultrices eu gravida pellentesque risus eleifend
                ullamcorper.
              </p>
            </div>

            {/* Figma: Frame 7 — row, gap 20, buttons 265.585x48, r100 */}
            <div className="flex flex-col gap-4 sm:flex-row lg:gap-5">
              <Link
                href="/contact"
                className="flex h-12 w-full items-center justify-center rounded-full bg-neo-teal px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-neo-teal/90 sm:w-[265.59px]"
              >
                Bizimlə əlaqə
              </Link>
              <Link
                href="/services"
                className="flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-neo-ink transition-colors hover:bg-white/90 sm:w-[265.59px]"
              >
                Xidmətlərimiz
              </Link>
            </div>
          </div>

          {/* Figma: Frame 6 — column, gap 10, align-items: flex-end, width 524 */}
          <div className="flex w-full min-w-0 flex-col gap-[10px] lg:w-[36.39%] lg:items-end">
            <StatCard value="15+" label="Sahə Üzrə Ekspert" />
            {/* Figma: Frame 5 — row, gap 10, align-items: center, width 524 */}
            <div className="flex w-full flex-col gap-[10px] sm:flex-row sm:items-center">
              <StatCard value="40+" label="Uğurla Tamamlanmış Layihə" />
              <StatCard accent value="98%" label="Müştəri Məmnuniyyəti" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
