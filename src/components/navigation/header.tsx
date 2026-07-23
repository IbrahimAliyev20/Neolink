"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import Container from "@/components/shared/container";

/** Figma: `Header-menu` — 14/20, #3B4153, 2px gradient hover line below. */
const menu = [
  { label: "Ana səhifə", href: "/" },
  { label: "Haqqımızda", href: "/about" },
  { label: "Xidmətlər", href: "/services", hasMenu: true },
  { label: "Layihələr", href: "/projects" },
  { label: "Bloqlar", href: "/blog" },
];

/**
 * Figma: `Service-list-2` — two 440 columns, 4 services each. `image` is what
 * the 420x284 preview swaps to on hover (placeholders until real art lands).
 */
const serviceColumns = [
  [
    {
      label: "İT Konsaltinq",
      href: "/services/consulting",
      image: "/images/service-1.png",
    },
    {
      label: "DevOps və Proqram Mühəndisliyi",
      href: "/services/devops",
      image: "/images/service-2.png",
    },
    {
      label: "Bulud Xidmətləri",
      href: "/services/cloud",
      image: "/images/service-3.png",
    },
    {
      label: "İT İnfrasutruktur",
      href: "/services/infrastructure",
      image: "/images/service-4.png",
    },
  ],
  [
    {
      label: "İT Dəstək",
      href: "/services/support",
      image: "/images/why-photo-card.png",
    },
    {
      label: "Təchizat və Satış",
      href: "/services/supply",
      image: "/images/blog-card-1.png",
    },
    {
      label: "Kibertəhlükəsizlik",
      href: "/services/security",
      image: "/images/blog-card-2.png",
    },
    {
      label: "Peşəkar Xidmətlər",
      href: "/services/professional",
      image: "/images/about-feature.jpg",
    },
  ],
];

/** Default preview plus every service image, in render order. */
const previewImages = [
  "/images/services-menu-feature.png",
  ...serviceColumns.flat().map((service) => service.image),
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
  // Kept mounted through the closing tween so the panel can animate out too.
  const [panelMounted, setPanelMounted] = useState(false);
  // 0 = the default preview, 1..8 = the hovered service, matching previewImages.
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shownIndex = useRef(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (servicesOpen) setPanelMounted(true);
  }, [servicesOpen]);

  // Open: unroll from the header edge and lift the content in.
  // Close: reverse it, then unmount once the tween finishes.
  useEffect(() => {
    const panel = panelRef.current;
    const inner = panelInnerRef.current;
    if (!panelMounted || !panel || !inner) return;

    const ctx = gsap.context(() => {
      if (servicesOpen) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            panel,
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: 0.45 }
          )
          .fromTo(
            inner,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.4 },
            "-=0.32"
          );
      } else {
        gsap
          .timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => setPanelMounted(false),
          })
          .to(inner, { opacity: 0, y: -6, duration: 0.2 })
          .to(panel, { opacity: 0, y: -10, duration: 0.28 }, "-=0.14");
      }
    });

    return () => ctx.kill();
  }, [panelMounted, servicesOpen]);

  // Cross-fade the 420x284 preview whenever the hovered service changes.
  useEffect(() => {
    if (!servicesOpen) {
      shownIndex.current = previewIndex;
      return;
    }

    const incoming = previewRefs.current[previewIndex];
    const outgoing = previewRefs.current[shownIndex.current];
    if (!incoming || previewIndex === shownIndex.current) return;

    const ctx = gsap.context(() => {
      if (outgoing) {
        gsap.to(outgoing, {
          opacity: 0,
          scale: 1.04,
          duration: 0.35,
          ease: "power2.out",
        });
      }
      gsap.fromTo(
        incoming,
        { opacity: 0, scale: 1.1, yPercent: 3 },
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          duration: 0.55,
          ease: "power3.out",
        }
      );
    });

    shownIndex.current = previewIndex;
    return () => ctx.kill();
  }, [previewIndex, servicesOpen]);

  // Reset to the default artwork only once the panel is fully gone, so the
  // preview does not swap mid close-animation.
  useEffect(() => {
    if (!panelMounted) setPreviewIndex(0);
  }, [panelMounted]);

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
      {panelMounted && (
        <div
          ref={panelRef}
          // opacity-0 until GSAP takes over, otherwise the first paint flashes
          // the panel at full opacity before the tween starts.
          className="absolute inset-x-0 top-full z-50 hidden border-b border-[#e7e7ea] bg-white pt-9 pb-10 opacity-0 will-change-[transform,opacity] lg:block"
        >
          <Container className="2xl:px-0">
            {/* Figma: Frame 2147224671 — row, space-between, align center */}
            <div
              ref={panelInnerRef}
              className="flex w-full items-center justify-between gap-10 opacity-0 2xl:gap-[76px]"
            >
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
                          onMouseEnter={() =>
                            setPreviewIndex(
                              previewImages.indexOf(service.image)
                            )
                          }
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

              {/* Figma: Feauture — 420x284, r20, border #E7E7EA, image fill.
                  Layers are stacked and cross-faded with GSAP on hover. */}
              <div className="relative hidden h-[284px] w-[420px] shrink-0 overflow-hidden rounded-[20px] border border-[#e7e7ea] xl:block">
                {previewImages.map((image, index) => (
                  <div
                    key={image}
                    ref={(node) => {
                      previewRefs.current[index] = node;
                    }}
                    className="absolute inset-0"
                    // Only the initial state is set here; GSAP owns it after that.
                    style={{ opacity: index === 0 ? 1 : 0 }}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="420px"
                      aria-hidden
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
