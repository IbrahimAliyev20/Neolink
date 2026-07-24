"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { MagneticLink } from "@/components/animation/magnetic-link";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import { useBanner } from "@/services/banner/queries";

/**
 * Figma desktop: `Banner` (1920x490) — site-wide CTA strip rendered on every
 * page, just above the footer. Cropped photo background, py 81, px 240, content
 * 706 wide with a 64 gap between the copy block and the button row.
 * Figma mobile: `Banner` (375x252) — py 24 / px 16, content 343 with a 32 gap
 * and two half-width 40px buttons in one row.
 */
export function CtaBanner() {
  const { data: banner } = useBanner();
  const pathname = usePathname();
  // Hide the button that points to the page you're already on.
  const onContact = pathname.includes("/contact");
  const onServices = pathname.includes("/services");

  return (
    <section className="relative w-full overflow-hidden">
      <Parallax
        amount={26}
        className="pointer-events-none absolute inset-x-0 -inset-y-[18%] select-none"
      >
        <Image
          src="/images/cta-banner-bg.png"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover object-center"
        />
      </Parallax>

      <Container className="relative flex flex-col py-6 md:py-[60px] lg:h-[490px] lg:justify-center lg:py-[81px]">
        {/* Figma: Frame 2147224633 — column; gap 32 mobile / 64 desktop, width 706.
            The 706-wide column, tall banner and larger type kick in at `lg`
            (not `2xl`) so every screen above 1024px gets the full desktop
            composition instead of a full-width, overflowing headline. */}
        <Reveal
          y={64}
          scale={0.95}
          blur={8}
          stagger={0.24}
          className="flex flex-col gap-8 md:gap-10 lg:w-[706px] lg:gap-16"
        >
          {/* Figma: Frame 16 — column; gap 20 mobile / 24 desktop */}
          <div className="flex flex-col gap-5 md:gap-4 lg:gap-6">
            {/* The API title arrives as HTML (with Figma metadata spans that
                render nothing), so it is injected as-is. */}
            <h2
              className="text-[24px] leading-[32px] font-medium tracking-[0.01em] text-white md:text-[36px] md:leading-[46px] md:font-semibold md:tracking-[0] lg:text-[56px] lg:leading-[72px]"
              dangerouslySetInnerHTML={{
                __html:
                  banner?.title ??
                  'Gələcəyin Rəqəmsal Həllərini <span style="color:#009999">Bu Gün</span> Qurun!',
              }}
            />
            <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-[#e7e7ea] md:text-[16px] md:leading-[24px] lg:w-[631px]">
              {banner?.description ??
                "Biznes məqsədlərinizə uyğun innovativ proqram təminatı və rəqəmsal məhsullar hazırlamaq üçün ilk addımı birlikdə ataq."}
            </p>
          </div>

          {/* Figma: Frame 7 — row, gap 16; buttons 163.5x40 mobile, 265.585x48 desktop */}
          <div className="flex gap-4 lg:gap-5">
            {!onContact && (
              <MagneticLink
                href="/contact"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-neo-teal px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-neo-teal/90 sm:h-12 sm:w-[265.59px] sm:flex-none sm:text-[16px] sm:leading-[24px]"
              >
                Bizimlə əlaqə
              </MagneticLink>
            )}
            {!onServices && (
              <MagneticLink
                href="/services"
                className="flex h-10 flex-1 items-center justify-center rounded-full border border-neo-teal px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-neo-teal transition-colors hover:bg-neo-teal/10 sm:h-12 sm:w-[265.59px] sm:flex-none sm:text-[16px] sm:leading-[24px]"
              >
                Xidmətlərimiz
              </MagneticLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
