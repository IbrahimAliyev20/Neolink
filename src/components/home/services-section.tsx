import Image from "next/image";

import { ClipReveal } from "@/components/animation/clip-reveal";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import { ServicesRail } from "@/components/home/services-rail";
import Container from "@/components/shared/container";

/** Figma: `Service card` instances — text block 333 + gap 32 + 240x169 visual. */
const services = [
  {
    title: "İT Konsaltinq",
    image: "/images/service-1.png",
  },
  {
    title: "DevOps və Proqram Mühəndisliyi",
    image: "/images/service-2.png",
  },
  {
    title: "Bulud Xidmətləri",
    image: "/images/service-3.png",
  },
  {
    title: "İT İnfrastruktur",
    image: "/images/service-4.png",
  },
];

const description =
  "İT strategiyası iş hədəflərinizə uyğunlaşdırılır. Yol xəritəsi, risk auditləri və uyğunluq çərçivəsi (ISO 27001, GDPR, SOC 2).";

/**
 * Figma desktop: `Frame 2147224639` (1920x971, white, py 90, px 240, clipped).
 * `Frame 2147224630` — row, gap 102: heading column 566 + `Frame 2147224629`
 * (772 = 72 numbers rail + gap 95 + 605 cards).
 * Figma mobile: `Frame 2147225041` (375x851) — pt 36 / pb 12, single column with
 * a 32 gap: centred heading block, then the 36px numbers rail + gap 12 + 295
 * card column, and the backdrop strip (343x101) closing the section.
 */
export function ServicesSection() {
  return (
    // `overflow-clip` rather than `overflow-hidden`: it clips the backdrop the
    // same way but does not create a scroll container, which would stop the
    // heading below from sticking.
    <section className="relative w-full overflow-clip bg-white pt-9 pb-3 lg:py-[90px]">
      <Container className="relative 2xl:px-0">
        {/* Figma: `Burdaqal.az 1` — 800x534 at (-132, 396), opacity 72% */}
        <Parallax
          amount={16}
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
          <Reveal
            stagger={0.12}
            className="flex min-w-0 flex-col gap-4 text-center lg:sticky lg:top-[95px] lg:w-[39.31%] lg:self-start lg:gap-6 lg:text-left"
          >
            <h2 className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:text-[36px] md:leading-[46px] lg:text-[56px] lg:leading-[72px] lg:tracking-[0]">
              Biznesiniz üçün Güclü{" "}
              <span className="text-neo-teal">İT Ekosistemi</span>
            </h2>
            <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
              Böyüyən B2B şirkətləri üçün nəzərdə tutulmuş korporativ səviyyəli
              tam İT xidmətləri – hamısı bir mərkəzdən
            </p>
          </Reveal>

          {/* Figma: Frame 2147224629 — mobile row gap 12; desktop gap 95, width 772 */}
          <div className="flex min-w-0 gap-3 lg:w-[53.61%] lg:gap-[8%] xl:gap-[95px]">
            {/* Figma: Services-numbers — column gap 16; width 36 mobile / 72 desktop */}
            <ServicesRail count={services.length} />

            {/* Figma: Frame 2147224619 — column; gap 24 mobile / 36 desktop, width 605 */}
            <Reveal
              stagger={0.14}
              className="flex w-full min-w-0 flex-col gap-6 lg:flex-1 lg:gap-9"
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex items-center gap-4 lg:gap-8"
                >
                  {/* Figma: Frame 2147224617 — column; gap 11 mobile / 16 desktop */}
                  <div className="flex min-w-0 flex-1 flex-col gap-[11px] lg:gap-4">
                    <h3 className="text-[16px] leading-[24px] font-medium tracking-[0.01em] text-neo-ink lg:text-[24px] lg:leading-[32px]">
                      {service.title}
                    </h3>
                    <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted lg:text-[16px] lg:leading-[24px]">
                      {description}
                    </p>
                  </div>
                  {/* Figma: 112x79 mobile / 240x169 desktop, r12 */}
                  <ClipReveal className="aspect-[240/169] w-[38%] max-w-[112px] shrink-0 overflow-hidden rounded-[12px] bg-neo-teal lg:w-[40%] lg:max-w-[240px]">
                    <Image
                      src={service.image}
                      alt=""
                      width={240}
                      height={169}
                      aria-hidden
                      className="h-full w-full object-cover"
                    />
                  </ClipReveal>
                </div>
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
          className="pointer-events-none mt-[10px] h-[101px] w-full object-cover opacity-[0.72] select-none lg:hidden"
        />
      </Container>
    </section>
  );
}
