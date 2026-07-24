"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { CountUp } from "@/components/animation/count-up";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import Container from "@/components/shared/container";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { useWhyNeoline } from "@/services/why-neoline/queries";
import { useLogosWhy } from "@/services/logo/queries";

/**
 * Figma desktop: `Frame 2147224640` (1920x1100) — "Niyə Məhz Neoline?".
 * Column, py 90, gap 48: header `Frame 16` (788 wide) + `Home-statistics`
 * (1440 content column, two 360-tall rows with 24 gaps).
 * Figma mobile: `Frame 17` (375x1320) — py 36 / px 16, column gap 24; centred
 * header (gap 12) + five stacked 343-wide cards (gap 12, r16, p16, 216 tall;
 * the dark card is 224).
 */
export function WhyUsSection() {
  const t = useTranslations("home.whyUs");
  // API order: [0] "20+ Əməkdaşlıq" (stat card), [1] "İcradan Əvvəl
  // Strategiya", [2] "“Tək Tərəfdaş” Üstünlüyü".
  const { data: items } = useWhyNeoline();
  const { data: apiLogosWhy = [] } = useLogosWhy();
  // No fallback: when the API returns no logos the loop is simply left empty.
  const whyLogos: LogoItem[] = apiLogosWhy.map((logo) => ({
    src: logo.logo,
    href: logo.link || undefined,
  }));

  // The loop's logoHeight/gap are fixed numbers, so they are shrunk on mobile
  // (below lg) — otherwise the wide logos overflow the narrow card and fewer
  // than three stay visible. Smaller values keep at least three side by side.
  const [isMobileLoop, setIsMobileLoop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobileLoop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const statItem = items?.[0];
  const strategyItem = items?.[1];
  const partnerItem = items?.[2];
  // "20+ Əməkdaşlıq" → CountUp value + label; localized fallback when no API.
  let statNumber = "20+";
  let statLabel = t("statLabel");
  if (statItem?.title) {
    const parts = statItem.title.split(" ");
    statNumber = parts[0];
    statLabel = parts.slice(1).join(" ");
  }

  return (
    <section className="w-full py-9 lg:py-[90px]">
      <Container className="flex flex-col gap-6 lg:gap-12">
        {/* Figma: Frame 16 — column; gap 12 mobile / 24 desktop, width 788, centered */}
        <div className="mx-auto flex w-full max-w-[788px] flex-col items-center gap-3 lg:gap-6">
          <SplitLines>
            <h2 className="text-center text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-[#1c1c1e] md:text-[32px] md:leading-[44px] lg:text-[40px] lg:leading-[56px]">
              {t("heading")}
            </h2>
          </SplitLines>
          <Reveal y={44} blur={8} className="w-full max-w-[756px]">
            <p className="text-center text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
              {t("desc")}
            </p>
          </Reveal>
        </div>

        {/* Figma: Frame 2147225006 — column; gap 12 mobile / 24 desktop */}
        <div className="flex flex-col gap-3 lg:gap-6">
          {/* Figma: Frame 2147225004 — column gap 12 mobile; row gap 24, height 360 desktop */}
          <Reveal
            y={80}
            scale={0.92}
            blur={8}
            stagger={0.22}
            className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-6"
          >
            {/* Figma: Statistics-card-1 — 343x202 r16 p16 mobile / 880x360 r20 p 32/28
                desktop. Widths are flex ratios, matching Figma’s 880 : 537 split. */}
            <div className="relative flex min-h-[202px] w-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#e7e7ea] bg-white p-4 lg:min-h-[360px] lg:flex-[880] lg:rounded-[20px] lg:px-7 lg:py-8">
              <div className="flex flex-1 flex-col justify-between gap-9 lg:gap-0">
                <h3 className="max-w-[247px] text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:max-w-[465px] md:text-[28px] md:leading-[40px] lg:text-[40px] lg:leading-[56px]">
                  {partnerItem?.title ?? t("partnerTitle")}
                </h3>
                <p className="max-w-[824px] text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
                  {partnerItem?.description ?? t("partnerDesc")}
                </p>
              </div>

              {/* Figma: rotated decorative render — 395.29x263.53 at (502, 167.78)
                  inside the 880x360 card, i.e. 44.92% wide at 60.45% / -28%.
                  Percentages rather than pixels, so it holds its place now that
                  the card width follows the container. */}
              <Image
                src="/images/why-partner-visual.png"
                alt=""
                width={396}
                height={264}
                aria-hidden
                className="pointer-events-none absolute -top-[20%] left-[50%] h-auto w-[60.6%] max-w-none select-none lg:-top-[28%] lg:left-[60.45%] lg:w-[44.92%]"
              />
            </div>

            {/* Figma: Frame 2147225004 — 343x202 mobile / 537x360 desktop image card, r20 */}
            <div className="relative h-[202px] w-full min-w-0 overflow-hidden rounded-[16px] lg:h-auto lg:min-h-[360px] lg:flex-[537] lg:rounded-[20px]">
              <Parallax amount={26} className="absolute inset-x-0 -inset-y-[18%]">
                <Image
                  src="/images/why-photo-card.png"
                  alt=""
                  fill
                  sizes="(min-width: 1536px) 537px, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>

          {/* Figma: Frame 2147225005 — column gap 12 mobile; row gap 24, height 360 desktop */}
          <Reveal
            y={80}
            scale={0.92}
            blur={8}
            stagger={0.22}
            className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-6"
          >
            {/* Figma: Statistics-card-2 — 343x202 r16 p16 mobile / 340x360 r20 p24
                desktop. Flex ratios matching Figma’s 340 : 712 : 340 split. */}
            <div className="flex min-h-[202px] w-full min-w-0 flex-col rounded-[16px] bg-white p-4 lg:min-h-[360px] lg:flex-[340] lg:rounded-[20px] lg:p-6">
              <div className="flex flex-1 flex-col justify-between">
                <h3 className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:text-[28px] md:leading-[40px] lg:text-[40px] lg:leading-[56px]">
                  {strategyItem?.title ?? t("strategyTitle")}
                </h3>
                <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                  {strategyItem?.description ?? t("strategyDesc")}
                </p>
              </div>
            </div>

            {/* Figma: Statistics-card-3 — 343x202 r16 p16 mobile / 712x360 r20 p 32/28 desktop */}
            <div className="flex min-h-[202px] w-full min-w-0 flex-col overflow-hidden rounded-[16px] bg-[#0d153a] p-4 lg:min-h-[360px] lg:flex-[712] lg:rounded-[20px] lg:px-7 lg:py-8">
              <div className="flex flex-1 flex-col justify-between">
                <h3 className="max-w-[553px] text-[24px] leading-[32px] font-semibold tracking-[0.01em] text-white md:text-[28px] md:leading-[40px] lg:text-[40px] lg:leading-[56px]">
                  {t("corporateTitle")}
                </h3>
                {/* Figma: Frame 2147225009 — logos loop endlessly right to left.
                    Rendered only when the API returns logos; otherwise left empty. */}
                {whyLogos.length > 0 && (
                  <LogoLoop
                    logos={whyLogos}
                    direction="left"
                    speed={32}
                    gap={isMobileLoop ? 20 : 36}
                    logoHeight={isMobileLoop ? 22 : 38}
                    fadeOut
                    fadeOutColor="#0d153a"
                    className="opacity-70"
                    ariaLabel="Partnyor loqoları"
                  />
                )}
              </div>
            </div>

            {/* Figma: Statistics-card-4 — 343x202 r16 p16 mobile / 340x360 r20 p24 desktop */}
            <div className="flex min-h-[202px] w-full min-w-0 flex-col rounded-[16px] bg-white p-4 lg:min-h-[360px] lg:flex-[340] lg:rounded-[20px] lg:p-6">
              <div className="flex flex-1 flex-col justify-between">
                {/* Figma: Frame 2147224998 — column; gap 12 mobile / 16 desktop */}
                <div className="flex flex-col gap-3 lg:gap-4">
                  <span className="text-[32px] leading-[40px] font-semibold tracking-[0] text-neo-ink lg:text-[48px] lg:leading-[64px]">
                    <CountUp value={statNumber} />
                  </span>
                  <span className="text-[16px] leading-[24px] font-semibold tracking-[0.01em] text-neo-ink lg:text-[20px] lg:leading-[28px]">
                    {statLabel}
                  </span>
                </div>
                <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                  {statItem?.description ?? t("statDesc")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
