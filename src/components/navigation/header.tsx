"use client";

import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Container from "@/components/shared/container";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { useSetting } from "@/services/setting/queries";
import { useServices } from "@/services/service/queries";

/** Figma: `Header-menu` — 14/20, #3B4153, 2px gradient hover line below. */
type MenuItem = { key: string; href: string; hasMenu?: boolean };
const menu: MenuItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services", hasMenu: true },
  { key: "projects", href: "/projects" },
  { key: "blogs", href: "/blogs" },
];

/** Default preview art shown before any service row is hovered. */
const DEFAULT_PREVIEW = "/images/services-menu-feature.png";

/** Figma: `Hover-line` — 2px, r64, #EEFFFD → #3ABDAA → #EEFFFD. */
const hoverLine =
  "linear-gradient(90deg, #eefffd 6.26%, #3abdaa 50%, #eefffd 93.3%)";

/**
 * Figma: `Header` (1920x96, white, 1px #E7E7EA bottom border) — py 24, 1440
 * column: 130x48 logo, menu (gap 24) and the 151x48 contact button.
 * Hovering "Xidmətlər" opens `Service-list-2`, the full-width services panel.
 */
export function Header() {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const { data: setting } = useSetting();
  const { data: apiServices = [] } = useServices();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const changeLocale = (next: string) => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  // Services dropdown content, split into two columns. `image` is the photo the
  // 420x284 preview cross-fades to when the row is hovered.
  const serviceItems = apiServices.map((service) => ({
    label: service.name,
    href: `/services/${service.slug}`,
    image: service.cover_image_home,
  }));
  const half = Math.ceil(serviceItems.length / 2);
  const serviceColumns = [
    serviceItems.slice(0, half),
    serviceItems.slice(half),
  ];
  /** Default preview plus every service image, in render order. */
  const previewImages = [DEFAULT_PREVIEW, ...serviceItems.map((s) => s.image)];
  const [servicesOpen, setServicesOpen] = useState(false);
  // Kept mounted through the closing tween so the panel can animate out too.
  const [panelMounted, setPanelMounted] = useState(false);
  // 0 = the default preview, 1..8 = the hovered service, matching previewImages.
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shownIndex = useRef(0);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelInnerRef = useRef<HTMLDivElement | null>(null);

  // Tablet / mobile drawer, same mount-through-the-close-tween pattern.
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (servicesOpen) setPanelMounted(true);
  }, [servicesOpen]);

  useEffect(() => {
    if (mobileOpen) setMobileMounted(true);
  }, [mobileOpen]);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!mobileMounted || !drawer) return;

    const ctx = gsap.context(() => {
      if (mobileOpen) {
        // Slide-in only — never animate the panel's opacity. The drawer holds
        // the opaque white background, so if this tween is ever interrupted
        // (a re-render killing the context mid-flight) it must not be left
        // translucent, or the page bleeds through. A stalled y is invisible.
        gsap.fromTo(
          drawer,
          { y: -12 },
          { y: 0, duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.to(drawer, {
          opacity: 0,
          y: -10,
          duration: 0.28,
          ease: "power2.inOut",
          onComplete: () => {
            setMobileMounted(false);
            setMobileServicesOpen(false);
          },
        });
      }
    });

    return () => ctx.kill();
  }, [mobileMounted, mobileOpen]);

  // Close the drawer on navigation and keep the page from scrolling behind it.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  // Lock page scroll while the desktop services mega-menu is open.
  useEffect(() => {
    if (!servicesOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
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
      className="sticky top-0 z-50 w-full border-b border-[#f3f2f8] bg-white lg:border-[#e7e7ea]"
      onMouseLeave={() => setServicesOpen(false)}
    >
      <Container>
        {/* Figma: Frame 4 — row, space-between, align center, height 48 */}
        <div className="flex h-[66px] w-full items-center justify-between gap-4 lg:h-24 lg:gap-[151px]">
          <Link href="/" aria-label="Neoline" className="shrink-0">
            <Image
              src={setting?.sitelogo ?? "/images/logo.svg"}
              alt="Neoline"
              width={130}
              height={48}
              priority
              className="h-[34px] w-[90px] object-contain lg:h-12 lg:w-[130px]"
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
                    className={`flex items-center gap-1 text-[14px] leading-[20px] tracking-[0.01em] transition-colors hover:text-[#3abdaa] ${
                      highlighted
                        ? "font-medium text-[#1c1c1e]"
                        : "font-normal text-[#3b4153]"
                    }`}
                  >
                    {t(item.key)}
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

          {/* Language switcher + contact CTA (desktop). */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="flex h-12 items-center justify-center rounded-full bg-[#0d153a] px-6 text-[16px] leading-[24px] font-medium tracking-[0.01em] whitespace-nowrap text-white transition-colors hover:bg-[#0d153a]/90"
            >
              {t("contactCta")}
            </Link>
          </div>

          {/* Figma: the mobile top bar holds only the logo and the menu
              trigger — language selection lives inside the drawer. */}
          <div className="flex shrink-0 items-center lg:hidden">
            {/* Tablet / mobile trigger — the desktop nav collapses below lg. */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}
              aria-expanded={mobileOpen}
              className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-black"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" strokeWidth={1.5} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Figma: `Menu-opened` (375x700) — fills the viewport under the 66px
          header, pt 12 / px 16 / pb 44, list on top and the CTA pinned bottom. */}
      {mobileMounted && (
        <div
          ref={drawerRef}
          // `100dvh` (dynamic viewport height), not `100vh`: on Android Chrome
          // `vh` is the *largest* viewport, so it runs behind the address/nav
          // bar and pushes the bottom-pinned CTA off screen. `dvh` tracks the
          // actually-visible height, and the safe-area inset clears the gesture
          // bar so "Bizimlə əlaqə" always stays on screen.
          className="absolute inset-x-0 top-full z-50 flex h-[calc(100dvh-66px)] flex-col justify-between gap-4 overflow-y-auto bg-white px-4 pt-3 pb-[calc(2.75rem+env(safe-area-inset-bottom))] will-change-transform lg:hidden"
        >
          {/* Figma: Frame 2147225056 — rows, 1px #F7F7F7 separators */}
          <div className="flex flex-col">
            {menu.map((item, index) => {
              const isLast = index === menu.length - 1;

              if (item.hasMenu) {
                return (
                  <div
                    key={item.href}
                    className={`flex flex-col ${
                      mobileServicesOpen ? "pt-4" : "border-b border-[#f7f7f7]"
                    }`}
                  >
                    {/* Figma: Responsive-menu — 56 tall, py 16, 16/24 Medium */}
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      aria-expanded={mobileServicesOpen}
                      className={`flex cursor-pointer items-center justify-between gap-4 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-[#3b4153] ${
                        mobileServicesOpen ? "pb-6" : "py-4"
                      }`}
                    >
                      {t(item.key)}
                      <ChevronDown
                        className={`h-6 w-6 shrink-0 text-[#8e929c] transition-transform ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>

                    {/* Figma: Frame 2147225057 — service rows, gap 12 */}
                    {mobileServicesOpen && (
                      <div className="flex flex-col gap-3">
                        {serviceColumns.flat().map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between gap-4 border-b border-[#f7f7f7] px-4 pb-4 text-[14px] leading-[20px] font-normal tracking-[0.01em] text-neo-ink"
                          >
                            {service.label}
                            <ArrowUpRight
                              className="h-6 w-6 shrink-0"
                              strokeWidth={1.5}
                            />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-4 text-[16px] leading-[24px] font-medium tracking-[0.01em] text-[#3b4153] ${
                    isLast ? "" : "border-b border-[#f7f7f7]"
                  }`}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>

          {/* Figma: Frame 2147225097 — bottom block, 1px #E7E7EA divider on
              top, then the language selector and the contact CTA. */}
          <div className="flex shrink-0 flex-col gap-4">
            <div className="h-px w-full bg-[#e7e7ea]" />

            {/* Figma: Frame 2147224999 — "Dil seçimi" label + AZ/EN/RU pills */}
            <div className="flex flex-col gap-4">
              <span className="text-[12px] leading-[16px] font-medium text-[#5b606f]">
                {tLang("aria")}
              </span>
              <div className="flex gap-3">
                {routing.locales.map((loc) => {
                  const active = loc === locale;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => changeLocale(loc)}
                      aria-pressed={active}
                      className={`flex flex-1 cursor-pointer items-center justify-center rounded-full px-3 py-2 text-[12px] leading-[16px] font-medium transition-colors ${
                        active
                          ? "bg-[#3abdaa] text-white"
                          : "bg-[#f7f7f7] text-[#3b4153] hover:bg-[#eef0f3]"
                      }`}
                    >
                      {tLang(loc)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Figma: Common buttons — 343x40, #0D153A, r100, 14/20 Medium */}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-full items-center justify-center rounded-full bg-[#0d153a] px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-[#0d153a]/90"
            >
              {t("contactCta")}
            </Link>
          </div>
        </div>
      )}

      {/* Figma: Service-list-2 — 1920x360, white, pt 36 / pb 40, px 240 */}
      {panelMounted && (
        <div
          ref={panelRef}
          // opacity-0 until GSAP takes over, otherwise the first paint flashes
          // the panel at full opacity before the tween starts.
          className="absolute inset-x-0 top-full z-50 hidden border-b border-[#e7e7ea] bg-white pt-9 pb-10 opacity-0 will-change-[transform,opacity] lg:block"
        >
          <Container>
            {/* Figma: Frame 2147224671 — row, space-between, align center */}
            <div
              ref={panelInnerRef}
              className="flex w-full items-start justify-between gap-10 opacity-0 2xl:gap-[76px]"
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
