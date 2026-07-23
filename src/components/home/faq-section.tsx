"use client";

import { ArrowUpRight, Headphones, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { MagneticLink } from "@/components/animation/magnetic-link";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const answer =
  "Neoline UX/UI dizayn, korporativ veb saytlar, e-commerce platformaları, landing page-lər, fərdi veb həllər, texniki dəstək və rəqəmsal məhsulların hazırlanması üzrə xidmətlər təqdim edir.";

const faqs = [
  { question: "Neoline hansı xidmətləri təqdim edir?", answer },
  { question: "Layihənin hazırlanması nə qədər vaxt aparır?", answer },
  { question: "Layihəyə başlamazdan əvvəl qiymət necə müəyyən edilir?", answer },
  { question: "Layihə müddətində prosesi izləyə bilərəm?", answer },
  { question: "Layihə neçə mərhələdən ibarətdir?", answer },
  { question: "Hansı texnologiyalardan istifadə edirsiniz?", answer },
];

const supportAvatars = [
  "/images/support-1.png",
  "/images/support-2.png",
  "/images/support-3.png",
];

/**
 * Figma desktop: `Frame 2147224638` (1920x714, white, py 90) — `Frame 2147224630`
 * row, gap 102: 566 intro column + 740 `FAQ` accordion (items gap 10).
 * Figma mobile: `Frame 2147224638` (375x978) — py 36, single column with a 32
 * gap: intro (gap 28) above the accordion, 44px avatars and a full-width button.
 */
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const supportRef = useRef<HTMLDivElement | null>(null);

  // The support avatars pop in one by one, then the badge slides out from
  // behind them.
  useEffect(() => {
    const root = supportRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Scrubbed like the other reveals, so it follows the scroll in both
      // directions instead of toggling.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top 90%",
            end: "top 62%",
            scrub: 0.6,
          },
        })
        .from(".js-faq-avatar", {
          scale: 0.6,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
        })
        .from(".js-faq-badge", { x: -16, opacity: 0, duration: 0.4 }, "-=0.2");
    }, root);

    return () => ctx.kill();
  }, []);

  // Every answer stays mounted at height 0 so it can be tweened open instead of
  // popping in and out with the layout.
  useEffect(() => {
    const ctx = gsap.context(() => {
      panelRefs.current.forEach((panel, index) => {
        const icon = iconRefs.current[index];
        if (!panel) return;

        const isOpen = openIndex === index;
        const instant = prefersReducedMotion();

        gsap.to(panel, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          duration: instant ? 0 : 0.45,
          ease: isOpen ? "power3.out" : "power2.inOut",
        });

        // The plus turns into a cross rather than swapping icons.
        if (icon) {
          gsap.to(icon, {
            rotate: isOpen ? 135 : 0,
            duration: instant ? 0 : 0.4,
            ease: "power2.inOut",
          });
        }
      });
    });

    return () => ctx.kill();
  }, [openIndex]);

  return (
    <section className="w-full overflow-hidden bg-white py-9 lg:py-[90px]">
      <Container className="flex flex-col gap-8 lg:flex-row lg:gap-[7.08%] 2xl:px-0">
        {/* Figma: Frame 2147225017 — column; mobile gap 28, desktop gap 102 / width 566 */}
        <div className="flex min-w-0 flex-col gap-7 lg:w-[39.31%] lg:gap-[102px]">
          {/* Figma: Frame 16 — column, gap 16 mobile / 24 desktop */}
          <Reveal stagger={0.12} className="flex flex-col gap-4 lg:gap-6">
            <h2 className="text-[20px] leading-[28px] font-semibold tracking-[0.01em] text-neo-ink md:text-[36px] md:leading-[46px] lg:text-[56px] lg:leading-[72px] lg:tracking-[0]">
              Ən Çox Verilən <span className="text-neo-teal">Suallar</span>
            </h2>
            <p className="text-[12px] leading-[16px] font-normal tracking-[0.01em] text-neo-muted md:text-[16px] md:leading-[24px]">
              Komandamız sizə uyğun həlli müəyyənləşdirmək və bütün suallarınızı
              cavablandırmaq üçün hər zaman hazırdır.
            </p>
          </Reveal>

          {/* Figma: Frame 2147225018 — column; gap 24 mobile / 32 desktop, width 417 */}
          <div className="flex flex-col gap-6 lg:w-full lg:max-w-[417px] lg:gap-8">
            {/* Figma: Frame 2147225017 — row, gap 12, align center */}
            <div ref={supportRef} className="flex items-center gap-3">
              {/* Figma: Support team — 3 avatars, 44px mobile / 56px desktop, overlap 12 */}
              <div className="flex items-center">
                {supportAvatars.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt=""
                    width={56}
                    height={56}
                    aria-hidden
                    className={`js-faq-avatar h-11 w-11 rounded-full border-2 border-[#e7e7ea] bg-white object-cover lg:h-[56px] lg:w-[56px] ${
                      index > 0 ? "-ml-3" : ""
                    }`}
                  />
                ))}
              </div>

              {/* Figma: Badge — #F7F7F7, r full, px 10 mobile / 12 desktop, py 8, gap 10 */}
              <div className="js-faq-badge flex items-center gap-[10px] rounded-full bg-[#f7f7f7] px-[10px] py-2 lg:px-3">
                <Headphones
                  className="h-5 w-5 shrink-0 text-neo-teal lg:h-[21px] lg:w-[21px]"
                  strokeWidth={1.5}
                />
                <span className="text-[12px] leading-[16px] font-semibold tracking-[0.01em] text-[#3b4153]">
                  7/24 yanınızdayıq
                </span>
              </div>
            </div>

            {/* Figma: Common buttons — full width, h40 mobile / 417x48 desktop, #0D153A, r100, gap 16 */}
            <MagneticLink
              href="/contact"
              strength={0.15}
              className="group/cta flex h-10 w-full items-center justify-center gap-4 rounded-full bg-[#0d153a] px-6 text-[14px] leading-[20px] font-medium tracking-[0.01em] text-white transition-colors hover:bg-[#0d153a]/90 lg:h-12 lg:text-[16px] lg:leading-[24px]"
            >
              Əlaqəyə keç
              <ArrowUpRight
                className="h-5 w-5 transition-transform duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 lg:h-6 lg:w-6"
                strokeWidth={1.5}
              />
            </MagneticLink>
          </div>
        </div>

        {/* Figma: FAQ — column, gap 10, width 740 */}
        <div className="flex min-w-0 flex-col gap-[10px] lg:w-[51.39%]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              /* Figma: Questions — #F7F7F7, border #F6F6F6, r12, gap 24;
                 padding 14/12 mobile, 20 desktop */
              <div
                key={faq.question}
                className="flex items-start gap-6 rounded-[12px] border border-[#f6f6f6] bg-[#f7f7f7] px-3 py-[14px] lg:p-5"
              >
                {/* Figma: Q&A — column, gap 12, width 644 */}
                <div className="flex flex-1 flex-col">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="cursor-pointer text-left text-[16px] leading-[24px] font-medium tracking-[0] text-[#1c1e1d]"
                  >
                    {faq.question}
                  </button>
                  {/* Kept mounted at height 0 so GSAP can tween it open. */}
                  <div
                    ref={(node) => {
                      panelRefs.current[index] = node;
                    }}
                    className="h-0 overflow-hidden opacity-0"
                  >
                    <p className="pt-3 text-[14px] leading-[24px] font-normal tracking-[0] text-[#49535c]">
                      {faq.answer}
                    </p>
                  </div>
                </div>

                {/* Figma: Quantity-number — 32px white circle, border #F6F6F6 */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-label={isOpen ? "Bağla" : "Aç"}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#f6f6f6] bg-white text-[#20201e]"
                >
                  <span
                    ref={(node) => {
                      iconRefs.current[index] = node;
                    }}
                    className="flex items-center justify-center"
                  >
                    <Plus className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
