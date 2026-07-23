import Image from "next/image";

import Container from "@/components/shared/container";

/**
 * Figma: `Frame 2147224640` (1920x1100) — "Niyə Məhz Neoline?".
 * Column, py 90, gap 48: header `Frame 16` (788 wide) + `Home-statistics`
 * (1440 content column, two 360-tall rows with 24 gaps).
 */
export function WhyUsSection() {
  return (
    <section className="w-full py-[60px] lg:py-[90px]">
      <Container className="flex flex-col gap-10 lg:gap-12 2xl:px-0">
        {/* Figma: Frame 16 — column, gap 24, width 788, centered */}
        <div className="mx-auto flex w-full max-w-[788px] flex-col items-center gap-4 lg:gap-6">
          <h2 className="text-center text-[32px] leading-[44px] font-semibold tracking-[0.01em] text-[#1c1c1e] lg:text-[40px] lg:leading-[56px]">
            Niyə Məhz Neoline?
          </h2>
          <p className="max-w-[756px] text-center text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
            2022-ci ildə qurulan Neoline Technology, çoxsaylı İT podratçıların
            xaosunu tək məsuliyyətli tərəfdaşla əvəz etmək üçün yaradıb.
          </p>
        </div>

        {/* Figma: Frame 2147225006 — column, gap 24 */}
        <div className="flex flex-col gap-6">
          {/* Figma: Frame 2147225004 — row, gap 24, height 360 */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
            {/* Figma: Statistics-card-1 — 880x360, r20, border #E7E7EA, p 32/28 */}
            <div className="relative flex min-h-[360px] w-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#e7e7ea] bg-white px-7 py-8 lg:w-[61.1%]">
              <div className="flex h-full flex-col justify-between">
                <h3 className="max-w-[465px] text-[28px] leading-[40px] font-semibold tracking-[0.01em] text-neo-ink lg:text-[40px] lg:leading-[56px]">
                  “Tək Tərəfdaş” Üstünlüyü
                </h3>
                <p className="max-w-[824px] text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                  Avadanlıq, proqram təminatı, bulud həlləri və təhlükəsizlik
                  hamısı bir dam altında. Neoline yarananda bir sürücü
                  tərəfindən ayrı-ayrı idarə olunan sistemlərini yenidən
                  birləşdirdi.
                </p>
              </div>

              {/* Figma: rotated 46.3° decorative render, 395.29x263.53 at (502, 167.78) */}
              <Image
                src="/images/why-partner-visual.png"
                alt=""
                width={396}
                height={264}
                aria-hidden
                className="pointer-events-none absolute -top-[100.78px] left-[532px] hidden  max-w-none  select-none 2xl:block"
              />
            </div>

            {/* Figma: Frame 2147225004 — 537x360 image card, r20 */}
            <div className="relative h-[240px] w-full min-w-0 overflow-hidden rounded-[20px] lg:h-auto lg:min-h-[360px] lg:w-[37.24%]">
              <Image
                src="/images/why-photo-card.png"
                alt=""
                fill
                sizes="(min-width: 1536px) 537px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Figma: Frame 2147225005 — row, gap 24, height 360 */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
            {/* Figma: Statistics-card-2 — 340x360, r20, p 24 */}
            <div className="flex min-h-[360px] w-full min-w-0 flex-col rounded-[20px] bg-white p-6 lg:w-[23.61%]">
              <div className="flex h-full flex-col justify-between">
                <h3 className="text-[28px] leading-[40px] font-semibold tracking-[0.01em] text-neo-ink lg:text-[40px] lg:leading-[56px]">
                  İcradan Əvvəl Strategiya
                </h3>
                <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                  Biz sadəcə avadanlıq satmırıq. Hər müştəriyə audit edir,
                  riskləri qiymətləndirir və məqsədinizə uyğun İT inkişaf planı
                  hazırlayırıq.
                </p>
              </div>
            </div>

            {/* Figma: Statistics-card-3 — 712x360, #0D153A, r20, p 32/28 */}
            <div className="flex min-h-[360px] w-full min-w-0 flex-col overflow-hidden rounded-[20px] bg-[#0d153a] px-7 py-8 lg:w-[49.44%]">
              <div className="flex h-full flex-col justify-between">
                <h3 className="max-w-[553px] text-[28px] leading-[40px] font-semibold tracking-[0.01em] text-white lg:text-[40px] lg:leading-[56px]">
                  Korporativ Təcrübə, Kompakt Yanaşma
                </h3>
                {/* Figma: Frame 2147225009 — row, gap 36, space-between */}
                <div className="flex flex-wrap items-start justify-between gap-9">
                  <Image
                    src="/images/logo-1.png"
                    alt=""
                    width={200}
                    height={38}
                    aria-hidden
                    className="h-[38px] w-[200px] object-contain"
                  />
                  <Image
                    src="/images/logo-2.png"
                    alt=""
                    width={161}
                    height={72}
                    aria-hidden
                    className="h-[72px] w-[161px] object-contain"
                  />
                  <Image
                    src="/images/logo-3.png"
                    alt=""
                    width={209}
                    height={45}
                    aria-hidden
                    className="h-[45px] w-[209px] object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Figma: Statistics-card-4 — 340x360, r20, p 24 */}
            <div className="flex min-h-[360px] w-full min-w-0 flex-col rounded-[20px] bg-white p-6 lg:w-[23.61%]">
              <div className="flex h-full flex-col justify-between">
                {/* Figma: Frame 2147224998 — column, gap 16 */}
                <div className="flex flex-col gap-4">
                  <span className="text-[48px] leading-[64px] font-semibold tracking-[0] text-neo-ink">
                    20+
                  </span>
                  <span className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
