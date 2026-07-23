import Image from "next/image";

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
 * Figma: `Frame 2147224639` (1920x971, white, py 90, px 240, clipped).
 * `Frame 2147224630` — row, gap 102: heading column 566 + `Frame 2147224629`
 * (772 = 72 numbers rail + gap 95 + 605 cards).
 */
export function ServicesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-[60px] 2xl:py-[90px]">
      <Container className="relative 2xl:px-0">
        {/* Figma: `Burdaqal.az 1` — 800x534 at (-132, 396), opacity 72% */}
        <Image
          src="/images/services-backdrop.png"
          alt=""
          width={800}
          height={534}
          aria-hidden
          className="pointer-events-none absolute top-[396px] -left-[132px] hidden h-[534px] w-[800px] max-w-none opacity-[0.72] select-none 2xl:block"
        />

        {/* Figma: Frame 2147224630 — row, gap 102, width 1440 */}
        <div className="relative flex flex-col gap-12 2xl:flex-row 2xl:gap-[102px]">
          {/* Figma: Frame 16 — column, gap 24, width 566 */}
          <div className="flex flex-col gap-4 2xl:w-[566px] 2xl:gap-6">
            <h2 className="text-[36px] leading-[46px] font-semibold tracking-[0] text-neo-ink 2xl:text-[56px] 2xl:leading-[72px]">
              Biznesiniz üçün Güclü{" "}
              <span className="text-neo-teal">İT Ekosistemi</span>
            </h2>
            <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
              Böyüyən B2B şirkətləri üçün nəzərdə tutulmuş korporativ səviyyəli
              tam İT xidmətləri – hamısı bir mərkəzdən
            </p>
          </div>

          {/* Figma: Frame 2147224629 — row, gap 95, width 772 */}
          <div className="flex gap-8 2xl:w-[772px] 2xl:gap-[95px]">
            {/* Figma: Services-numbers — column, gap 16, width 72 */}
            <div className="hidden w-[72px] shrink-0 flex-col items-center gap-4 2xl:flex">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className="flex flex-col items-center gap-4"
                >
                  <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-neo-teal text-[32px] leading-[40px] font-medium tracking-[0.01em] text-neo-teal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-[97.75px] w-px rounded-[20px] bg-[#7bd3c6]"
                  />
                </div>
              ))}
            </div>

            {/* Figma: Frame 2147224619 — column, gap 36, width 605 */}
            <div className="flex w-full flex-col gap-8 2xl:w-[605px] 2xl:gap-9">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="flex flex-col items-start gap-6 sm:flex-row sm:items-center 2xl:gap-8"
                >
                  {/* Figma: Frame 2147224617 — column, gap 16, width 333 */}
                  <div className="flex flex-col gap-4 sm:w-[333px]">
                    <h3 className="text-[24px] leading-[32px] font-medium tracking-[0.01em] text-neo-ink">
                      {service.title}
                    </h3>
                    <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
                      {description}
                    </p>
                  </div>
                  <Image
                    src={service.image}
                    alt=""
                    width={240}
                    height={169}
                    aria-hidden
                    className="h-[169px] w-full shrink-0 rounded-[12px] bg-neo-teal object-cover sm:w-[240px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
