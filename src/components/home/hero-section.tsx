import Link from "next/link";
import { useTranslations } from "next-intl";

import { StatCard } from "@/components/home/stat-card";

/**
 * Figma: `Frame 1` (1920x997) — hero for the home page.
 * Content column is 1440 wide, offset 467px from the top of the frame.
 */
export function HeroSection() {
  const t = useTranslations("hero");

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
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_400%] select-none"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col px-6 pt-[120px] pb-[160px] xl:h-[997px] xl:px-0 xl:pt-[259px] xl:pb-[90px]">
        {/* Figma: Frame 8 — row, gap 220, align-items: flex-end */}
        <div className="flex flex-col items-start gap-16 xl:flex-row xl:items-end xl:gap-[220px]">
          {/* Figma: Frame 3 — column, gap 72, width 696 */}
          <div className="flex w-full flex-col gap-10 xl:w-[696px] xl:gap-[72px]">
            {/* Figma: Frame 2 — column, gap 24 */}
            <div className="flex flex-col gap-4 xl:gap-6">
              <h1 className="text-[40px] leading-[52px] font-semibold tracking-[0] text-neo-ink md:text-[52px] md:leading-[66px] xl:text-[64px] xl:leading-[80px]">
                {t.rich("title", {
                  accent: (chunks) => (
                    <span className="text-neo-teal">{chunks}</span>
                  ),
                })}
              </h1>
              <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted xl:text-[20px] xl:leading-[28px]">
                {t("description")}
              </p>
            </div>

            {/* Figma: Frame 7 — row, gap 20 */}
            <div className="flex flex-col gap-4 sm:flex-row xl:gap-5">
              <Link
                href="/contact"
                className="flex h-12 w-full items-center justify-center rounded-full bg-neo-teal px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-neo-teal/90 sm:w-[265.59px]"
              >
                {t("primaryCta")}
              </Link>
              <Link
                href="/services"
                className="flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-neo-ink transition-colors hover:bg-white/90 sm:w-[265.59px]"
              >
                {t("secondaryCta")}
              </Link>
            </div>
          </div>

          {/* Figma: Frame 6 — column, gap 10, align-items: flex-end, width 524 */}
          <div className="flex w-full flex-col gap-[10px] xl:w-[524px] xl:items-end">
            <StatCard value={t("stats.experts.value")} label={t("stats.experts.label")} />
            {/* Figma: Frame 5 — row, gap 10 */}
            <div className="flex flex-col gap-[10px] sm:flex-row sm:items-center">
              <StatCard
                value={t("stats.projects.value")}
                label={t("stats.projects.label")}
              />
              <StatCard
                accent
                value={t("stats.satisfaction.value")}
                label={t("stats.satisfaction.label")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
