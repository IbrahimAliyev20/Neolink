"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Container from "@/components/shared/container";

/** Figma: `Header-menu` — 14/20, #3B4153, 2px gradient hover line below. */
const menu = [
  { label: "Ana səhifə", href: "/" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Xidmətlər", href: "/services", hasMenu: true },
  { label: "Layihələr", href: "/projects" },
  { label: "Bloqlar", href: "/blog" },
];

/** Figma: `Service-list-2` — two 440 columns, 4 services each. */
const serviceColumns = [
  [
    { label: "İT Konsaltinq", href: "/services/consulting" },
    { label: "DevOps və Proqram Mühəndisliyi", href: "/services/devops" },
    { label: "Bulud Xidmətləri", href: "/services/cloud" },
    { label: "İT İnfrasutruktur", href: "/services/infrastructure" },
  ],
  [
    { label: "İT Dəstək", href: "/services/support" },
    { label: "Təchizat və Satış", href: "/services/supply" },
    { label: "Kibertəhlükəsizlik", href: "/services/security" },
    { label: "Peşəkar Xidmətlər", href: "/services/professional" },
  ],
];

/** Figma: `Hover-line` — 2px, r64, #EEFFFD → #3ABDAA → #EEFFFD. */
const hoverLine =
  "linear-gradient(90deg, #eefffd 6.26%, #3abdaa 50%, #eefffd 93.3%)";

/**
 * Figma: `Header` (1920x96, white, 1px #E7E7EA bottom border) — py 24, 1440
 * column: 130x48 logo, menu (gap 24) and the 151x48 contact button.
 * Hovering "Xidmətlər" opens `Service-list-2`, the full-width services panel.
 */
export function Header() {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header
      className="relative w-full border-b border-[#e7e7ea] bg-white"
      onMouseLeave={() => setServicesOpen(false)}
    >
      <Container className="2xl:px-0">
        {/* Figma: Frame 4 — row, space-between, align center, height 48 */}
        <div className="flex w-full items-center justify-between gap-6 py-6 lg:h-24 lg:gap-[151px]">
          <Link href="/" aria-label="Neoline" className="shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Neoline"
              width={130}
              height={48}
              priority
              className="h-12 w-[130px] object-contain"
            />
          </Link>

          {/* Figma: Frame 3 — row, gap 24 */}
          <nav className="hidden items-center gap-6 lg:flex">
            {menu.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/" || /^\/[a-z]{2}$/.test(pathname)
                  : pathname.includes(item.href);
              const isOpen = item.hasMenu && servicesOpen;
              const highlighted = isActive || isOpen;

              return (
                <div
                  key={item.href}
                  className="flex flex-col gap-1"
                  onMouseEnter={() => setServicesOpen(Boolean(item.hasMenu))}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-[14px] leading-[20px] tracking-[0.01em] transition-colors ${
                      highlighted
                        ? "font-medium text-[#1c1c1e]"
                        : "font-normal text-[#3b4153]"
                    }`}
                  >
                    {item.label}
                    {item.hasMenu && (
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    )}
                  </Link>
                  <span
                    aria-hidden
                    className="h-[2px] w-full rounded-[64px] transition-opacity"
                    style={{
                      background: hoverLine,
                      opacity: highlighted ? 1 : 0,
                    }}
                  />
                </div>
              );
            })}
          </nav>

          {/* Figma: Common buttons — 151x48, #0D153A, r100 */}
          <Link
            href="/contact"
            className="flex h-12 shrink-0 items-center justify-center rounded-full bg-[#0d153a] px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] whitespace-nowrap text-white transition-colors hover:bg-[#0d153a]/90"
          >
            Bizimlə əlaqə
          </Link>
        </div>
      </Container>

      {/* Figma: Service-list-2 — 1920x360, white, pt 36 / pb 40, px 240 */}
      {servicesOpen && (
        <div className="absolute inset-x-0 top-full z-50 hidden border-b border-[#e7e7ea] bg-white pt-9 pb-10 lg:block">
          <Container className="2xl:px-0">
            {/* Figma: Frame 2147224671 — row, space-between, align center */}
            <div className="flex w-full items-center justify-between gap-10 2xl:gap-[76px]">
              {/* Figma: Frame 2147224666 — row, gap 64, width 944 */}
              <div className="flex flex-1 gap-8 2xl:w-[944px] 2xl:flex-none 2xl:gap-16">
                {serviceColumns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    className="flex flex-1 flex-col gap-5 2xl:w-[440px] 2xl:flex-none"
                  >
                    {column.map((service, serviceIndex) => (
                      <div key={service.href} className="flex flex-col gap-5">
                        {/* Figma: Service-title — row, space-between, 20/28 */}
                        <Link
                          href={service.href}
                          className="group flex items-center justify-between gap-4 text-[20px] leading-[28px] font-normal tracking-[0.01em] text-[#3b4153] transition-colors hover:font-semibold hover:text-neo-ink"
                        >
                          {service.label}
                          <ArrowUpRight
                            className="h-7 w-7 shrink-0"
                            strokeWidth={2}
                          />
                        </Link>
                        {serviceIndex < column.length - 1 && (
                          <div className="h-px w-full bg-[#e7e7ea]" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Figma: Feauture — 420x284, r20, border #E7E7EA, image fill */}
              <div className="relative hidden h-[284px] w-[420px] shrink-0 overflow-hidden rounded-[20px] border border-[#e7e7ea] xl:block">
                <Image
                  src="/images/services-menu-feature.png"
                  alt=""
                  fill
                  sizes="420px"
                  aria-hidden
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
