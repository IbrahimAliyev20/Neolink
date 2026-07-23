import Image from "next/image";

import { CountUp } from "@/components/animation/count-up";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";

/**
 * Figma desktop: `Frame 2147224640` (1920x1100) — "Niyə Məhz Neoline?".
 * Column, py 90, gap 48: header `Frame 16` (788 wide) + `Home-statistics`
 * (1440 content column, two 360-tall rows with 24 gaps).
 * Figma mobile: `Frame 17` (375x1320) — py 36 / px 16, column gap 24; centred
 * header (gap 12) + five stacked 343-wide cards (gap 12, r16, p16, 216 tall;
 * the dark card is 224).
 */
export function WhyUsSection() {
  return (
    <section className="w-full py-9 lg:py-[90px]">
      <Container className="flex flex-col gap-6 lg:gap-12">
        {/* Figma: Frame 16 — column; gap 12 mobile / 24 desktop, width 788, centered */}
        <Reveal
          stagger={0.12}
          className="mx-auto flex w-full max-w-[788px] flex-col items-center gap-3 lg:gap-6"
        >
          <h2 className="text-center text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-[#1c1c1e] md:text-[32px] md:leading-[44px] lg:text-[40px] lg:leading-[56px]">
            Niyə Məhz Neoline?
          </h2>
          <p className="max-w-[756px] text-center text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
            2022-ci ildə qurulan Neoline Technology, çoxsaylı İT podratçıların
            xaosunu tək məsuliyyətli tərəfdaşla əvəz etmək üçün yaradıb.
          </p>
        </Reveal>

        {/* Figma: Frame 2147225006 — column; gap 12 mobile / 24 desktop */}
        <div className="flex flex-col gap-3 lg:gap-6">
          {/* Figma: Frame 2147225004 — column gap 12 mobile; row gap 24, height 360 desktop */}
          <Reveal
            stagger={0.1}
            className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-6"
          >
            {/* Figma: Statistics-card-1 — 343x216 r16 p16 mobile / 880x360 r20 p 32/28
                desktop. Widths are flex ratios, matching Figma’s 880 : 537 split. */}
            <div className="relative flex min-h-[216px] w-full min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#e7e7ea] bg-white p-4 lg:min-h-[360px] lg:flex-[880] lg:rounded-[20px] lg:px-7 lg:py-8">
              <div className="flex h-full flex-col justify-between gap-9 lg:gap-0">
                <h3 className="max-w-[247px] text-[24px] leading-[32px] font-semibold tracking-[0.01em] text-neo-ink md:max-w-[465px] md:text-[28px] md:leading-[40px] lg:text-[40px] lg:leading-[56px]">
                  “Tək Tərəfdaş” Üstünlüyü
                </h3>
                <p className="max-w-[824px] text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
                  Avadanlıq, proqram təminatı, bulud həlləri və təhlükəsizlik
                  hamısı bir dam altında. Neoline yarananda bir sürücü
                  tərəfindən ayrı-ayrı idarə olunan sistemlərini yenidən
                  birləşdirdi.
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

            {/* Figma: Frame 2147225004 — 343x216 mobile / 537x360 desktop image card, r20 */}
            <div className="relative h-[216px] w-full min-w-0 overflow-hidden rounded-[20px] lg:h-auto lg:min-h-[360px] lg:flex-[537]">
              <Parallax amount={14} className="absolute inset-x-0 -inset-y-[8%]">
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
            stagger={0.1}
            className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-6"
          >
            {/* Figma: Statistics-card-2 — 343x216 r16 p16 mobile / 340x360 r20 p24
                desktop. Flex ratios matching Figma’s 340 : 712 : 340 split. */}
            <div className="flex min-h-[216px] w-full min-w-0 flex-col rounded-[16px] bg-white p-4 lg:min-h-[360px] lg:flex-[340] lg:rounded-[20px] lg:p-6">
              <div className="flex h-full flex-col justify-between">
                <h3 className="text-[24px] leading-[32px] font-semibold tracking-[0.01em] text-neo-ink md:text-[28px] md:leading-[40px] lg:text-[40px] lg:leading-[56px]">
                  İcradan Əvvəl Strategiya
                </h3>
                <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                  Biz sadəcə avadanlıq satmırıq. Hər müştəriyə audit edir,
                  riskləri qiymətləndirir və məqsədinizə uyğun İT inkişaf planı
                  hazırlayırıq.
                </p>
              </div>
            </div>

            {/* Figma: Statistics-card-3 — 343x224 r16 p16 mobile / 712x360 r20 p 32/28 desktop */}
            <div className="flex min-h-[224px] w-full min-w-0 flex-col overflow-hidden rounded-[16px] bg-[#0d153a] p-4 lg:min-h-[360px] lg:flex-[712] lg:rounded-[20px] lg:px-7 lg:py-8">
              <div className="flex h-full flex-col justify-between">
                <h3 className="max-w-[553px] text-[24px] leading-[32px] font-semibold tracking-[0.01em] text-white md:text-[28px] md:leading-[40px] lg:text-[40px] lg:leading-[56px]">
                  Korporativ Təcrübə, Kompakt Yanaşma
                </h3>
                {/* Figma: Frame 2147225009 — row, gap 36, space-between; mobile
                    shows only the first two logos (161x31 and 130x58). No
                    wrapping: below 1920 the logos shrink inside their boxes
                    (`object-contain`) rather than dropping to a second line. */}
                <div className="flex items-start justify-between gap-4 xl:gap-9">
                  <Image
                    src="/images/logo-1.png"
                    alt=""
                    width={200}
                    height={38}
                    aria-hidden
                    className="h-[31px] w-[161px] min-w-0 object-contain opacity-70 lg:h-[38px] lg:w-[200px]"
                  />
                  <Image
                    src="/images/logo-2.png"
                    alt=""
                    width={161}
                    height={72}
                    aria-hidden
                    className="h-[58px] w-[130px] min-w-0 object-contain opacity-[0.72] lg:h-[72px] lg:w-[161px]"
                  />
                  <Image
                    src="/images/logo-3.png"
                    alt=""
                    width={209}
                    height={45}
                    aria-hidden
                    className="hidden h-[45px] w-[209px] min-w-0 object-contain opacity-[0.72] lg:block"
                  />
                </div>
              </div>
            </div>

            {/* Figma: Statistics-card-4 — 343x216 r16 p16 mobile / 340x360 r20 p24 desktop */}
            <div className="flex min-h-[216px] w-full min-w-0 flex-col rounded-[16px] bg-white p-4 lg:min-h-[360px] lg:flex-[340] lg:rounded-[20px] lg:p-6">
              <div className="flex h-full flex-col justify-between">
                {/* Figma: Frame 2147224998 — column; gap 12 mobile / 16 desktop */}
                <div className="flex flex-col gap-3 lg:gap-4">
                  <span className="text-[32px] leading-[40px] font-semibold tracking-[0] text-neo-ink lg:text-[48px] lg:leading-[64px]">
                    <CountUp value="20+" />
                  </span>
                  <span className="text-[16px] leading-[24px] font-semibold tracking-[0.01em] text-neo-ink lg:text-[20px] lg:leading-[28px]">
                    Əməkdaşlıq
                  </span>
                </div>
                <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                  Biz sadəcə avadanlıq satmırıq. Hər müştəriyə audit edir,
                  riskləri qiymətləndirir və məqsədinizə uyğun İT inkişaf planı
                  hazırlayırıq.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
