import Image from "next/image";
import Link from "next/link";

import Container from "@/components/shared/container";

/**
 * Figma: `Banner` (1920x490) — site-wide CTA strip rendered on every page,
 * just above the footer. Cropped photo background, py 81, px 240, content 706
 * wide with a 64 gap between the copy block and the button row.
 */
export function CtaBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/cta-banner-bg.png"
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="pointer-events-none object-cover object-center select-none"
      />

      <Container className="relative flex flex-col py-[60px] 2xl:h-[490px] 2xl:justify-center 2xl:px-0 2xl:py-[81px]">
        {/* Figma: Frame 2147224633 — column, gap 64, width 706 */}
        <div className="flex flex-col gap-10 2xl:w-[706px] 2xl:gap-16">
          {/* Figma: Frame 16 — column, gap 24 */}
          <div className="flex flex-col gap-4 2xl:gap-6">
            <h2 className="text-[36px] leading-[46px] font-semibold tracking-[0] text-white 2xl:text-[56px] 2xl:leading-[72px]">
              Gələcəyin Rəqəmsal Həllərini{" "}
              <span className="text-neo-teal">Bu Gün</span> Qurun!
            </h2>
            <p className="text-[16px] leading-[24px] font-normal tracking-[0.01em] text-[#e7e7ea] 2xl:w-[631px]">
              Biznes məqsədlərinizə uyğun innovativ proqram təminatı və rəqəmsal
              məhsullar hazırlamaq üçün ilk addımı birlikdə ataq.
            </p>
          </div>

          {/* Figma: Frame 7 — row, gap 20, buttons 265.585x48, r100 */}
          <div className="flex flex-col gap-4 sm:flex-row 2xl:gap-5">
            <Link
              href="/contact"
              className="flex h-12 w-full items-center justify-center rounded-full bg-neo-teal px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-neo-teal/90 sm:w-[265.59px]"
            >
              Bizimlə əlaqə
            </Link>
            <Link
              href="/services"
              className="flex h-12 w-full items-center justify-center rounded-full border border-neo-teal px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-neo-teal transition-colors hover:bg-neo-teal/10 sm:w-[265.59px]"
            >
              Xidmətlərimiz
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
