"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { ClipReveal } from "@/components/animation/clip-reveal";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import { ServicesRail } from "@/components/home/services-rail";
import Container from "@/components/shared/container";
import { useServices } from "@/services/service/queries";

/**
 * Figma desktop: `Frame 2147224639` (1920x971, white, py 90, px 240, clipped).
 * `Frame 2147224630` — row, gap 102: heading column 566 + `Frame 2147224629`
 * (772 = 72 numbers rail + gap 95 + 605 cards).
 * Figma mobile: `Frame 2147225041` (375x851) — pt 36 / pb 12, single column with
 * a 32 gap: centred heading block, then the 36px numbers rail + gap 12 + 295
 * card column, and the backdrop strip (343x101) closing the section.
 */
export function ServicesSection() {
  const t = useTranslations("home.services");
  const { data: services = [] } = useServices();

  if (services.length === 0) return null;

  return (
    // `overflow-clip` rather than `overflow-hidden`: it clips the backdrop the
    // same way but does not create a scroll container, which would stop the
    // heading below from sticking.
    <section className="relative w-full overflow-clip bg-white pt-9 pb-3 lg:py-[90px]">
      <Container className="relative">
        {/* Figma: `Burdaqal.az 1` — 800x534 at (-132, 396), opacity 72% */}
        <Parallax
          amount={30}
          className="pointer-events-none absolute top-[396px] -left-[132px] hidden h-[534px] w-[800px] max-w-none opacity-[0.72] select-none 2xl:block"
        >
          <Image
            src="/images/services-backdrop.png"
            alt=""
            width={800}
            height={534}
            aria-hidden
            className="h-full w-full max-w-none object-contain"
          />
        </Parallax>

        {/* Figma: Frame 2147224630 — mobile column gap 32; desktop row, gap 102 */}
        <div className="relative flex flex-col gap-8 lg:flex-row lg:gap-[7.08%]">
          {/* Figma: Frame 16 — mobile centred, gap 16; desktop left, gap 24 / width 566 */}
          {/* Sticks 95px below the top — clear of the 66px sticky header —
              while the service list scrolls past, and stops once the row (the
              section content) ends. */}
          <div className="flex min-w-0 flex-col gap-4 text-center lg:sticky lg:top-[95px] lg:w-[39.31%] lg:self-start lg:gap-6 lg:text-left">
            {/* Full 56/72 only from 2xl, where the column is the Figma 566 wide;
                between lg and 2xl the column is ~440 and 56px wraps badly. */}
            <SplitLines>
              <h2 className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:text-[36px] md:leading-[46px] lg:text-[40px] lg:leading-[52px] lg:tracking-[0] 2xl:text-[56px] 2xl:leading-[72px]">
                {t("headingPre")}{" "}
                <span className="text-neo-teal">{t("headingAccent")}</span>
              </h2>
            </SplitLines>
            <Reveal y={44} blur={8} className="w-full">
              <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
                {t("desc")}
              </p>
            </Reveal>
          </div>

          {/* Figma: Frame 2147224629 — mobile row gap 12; desktop gap 95, width 772 */}
          <div className="flex min-w-0 gap-3 lg:w-[53.61%] lg:gap-[8%] xl:gap-[95px]">
            {/* Figma: Services-numbers — column gap 16; width 36 mobile / 72 desktop */}
            <ServicesRail count={services.length} />

            {/* Figma: Frame 2147224619 — column; gap 24 mobile / 36 desktop, width 605 */}
            <Reveal
              key={services.length}
              x={72}
              y={0}
              blur={6}
              stagger={0.28}
              end="top 45%"
              className="flex w-full min-w-0 flex-col gap-6 lg:flex-1 lg:gap-9"
            >
              {services.map((service) => (
                <Link
                  href={`/services/${service.slug}`}
                  key={service.slug}
                  className="group flex items-center gap-4 lg:gap-8"
                >
                  {/* Figma: Frame 2147224617 — column; gap 11 mobile / 16 desktop */}
                  <div className="flex min-w-0 flex-1 flex-col gap-[11px] lg:gap-4">
                    <h3 className="text-[16px] leading-[24px] font-medium tracking-[0.01em] text-neo-ink lg:text-[20px] lg:leading-[28px] 2xl:text-[24px] 2xl:leading-[32px]">
                      {service.name}
                    </h3>
                    <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted lg:text-[14px] lg:leading-[22px] 2xl:text-[16px] 2xl:leading-[24px]">
                      {service.short_description}
                    </p>
                  </div>
                  {/* Figma: 112x79 mobile / 240x169 desktop, r12 */}
                  <ClipReveal className="aspect-[240/169] w-[38%] max-w-[112px] shrink-0 overflow-hidden rounded-[12px] bg-neo-teal lg:w-[40%] lg:max-w-[240px]">
                    <Image
                      src={service.cover_image_home}
                      alt=""
                      width={240}
                      height={169}
                      aria-hidden
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.3]"
                    />
                  </ClipReveal>
                </Link>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Figma mobile: `Burdaqal.az 1` — 343x101 strip below the cards (gap 10) */}
        <Image
          src="/images/services-backdrop.png"
          alt=""
          width={800}
          height={534}
          aria-hidden
          className="pointer-events-none mt-[10px] h-[101px] w-full object-cover object-top opacity-[0.72] select-none lg:hidden"
        />
      </Container>
    </section>
  );
}
