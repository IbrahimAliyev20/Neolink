import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/shared/container";

/** Figma: `Header-menu` items — 14/20 Regular, #8E929C, px 8 / py 4. */
const menu = [
  { label: "Haqqımızda", href: "/about" },
  { label: "Xidmətlər", href: "/services" },
  { label: "Layihələr", href: "/projects" },
  { label: "Bloqlar", href: "/blog" },
  { label: "Əlaqə", href: "/contact" },
];

/** Figma: `Social media icons` — 44px circles, white, 1px #E7E7EA, gap 8. */
const socials = [
  { label: "Instagram", icon: "/icons/instagram.svg", href: "#" },
  { label: "Facebook", icon: "/icons/facebook.svg", href: "#" },
  { label: "LinkedIn", icon: "/icons/linkedin.svg", href: "#" },
  { label: "X", icon: "/icons/twitter-x.svg", href: "#" },
];

/**
 * Figma desktop: `Footer` (1920x229, white) — column, gap 28, pt 48, pb 32.
 * Row 1: 130x48 logo + menu (gap 16). 1px #E7E7EA divider across the 1440
 * column. Row 2: copyright line + social icons, space-between.
 * Figma mobile: `Footer` (375x339) — column gap 20, pt 36 / pb 24, px 16.
 * Stacked 112x42 logo above a two-line centred menu (row gap 8), a full-bleed
 * divider, then the social icons above the copyright line.
 */
export function Footer() {
  return (
    <footer className="w-full bg-white pt-9 pb-6 lg:pt-12 lg:pb-8">
      <Container className="2xl:px-0">
        <div className="flex w-full flex-col gap-5 lg:gap-7">
          {/* Figma: Logo-Menus — mobile centred column gap 24; desktop row, space-between */}
          <div className="flex w-full flex-col items-center gap-6 lg:h-12 lg:flex-row lg:justify-between lg:gap-10">
            <Link href="/" aria-label="Neoline" className="shrink-0">
              <Image
                src="/images/logo.svg"
                alt="Neoline"
                width={130}
                height={48}
                priority
                className="h-[42px] w-[112px] object-contain lg:h-12 lg:w-[130px]"
              />
            </Link>

            {/* Figma: Frame 2147224961 — wrapped rows; column gap 16, row gap 8 */}
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:gap-4">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2 py-1 text-[14px] leading-[20px] font-normal tracking-[0.01em] text-[#8e929c] transition-colors hover:text-neo-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Figma: Frame 2147224962 — 1px #E7E7EA divider; full-bleed on mobile */}
          <div className="-mx-4 h-px bg-[#e7e7ea] md:mx-0 md:w-full" />

          {/* Figma: Logo-Menus — mobile centred column gap 24 with the socials on
              top; desktop row, space-between, height 44 */}
          <div className="flex w-full flex-col-reverse items-center gap-6 lg:h-11 lg:flex-row lg:justify-between lg:gap-10">
            {/* Figma: Copyrights — row; gap 0 mobile / 8 desktop */}
            <div className="flex items-center text-[#3b4153] lg:gap-2">
              <Copyright
                className="h-[21px] w-[21px] shrink-0 lg:h-6 lg:w-6"
                strokeWidth={1.5}
              />
              <span className="font-poppins text-[14px] leading-[20px] font-normal tracking-[0]">
                Neoline Technology MMC | Bütün hüquqlar qorunur.
              </span>
            </div>

            {/* Figma: Social media icons — row, gap 8 */}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e7e7ea] bg-white p-[10px] transition-colors hover:bg-[#f7f7f7]"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="h-6 w-6"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
