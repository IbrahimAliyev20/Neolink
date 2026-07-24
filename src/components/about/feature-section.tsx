"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { Parallax } from "@/components/animation/parallax";
import Container from "@/components/shared/container";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useAbout } from "@/services/about/queries";
import aboutFeature from "../../../public/images/about-feature.jpg";

export function FeatureSection() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const { data: about } = useAbout();

  // On-load intro, like the projects hero — not a scroll-scrubbed reveal. The
  // section sits just under the hero, so at scroll 0 a scrub reveal would
  // already be "complete" and it would just appear without ever animating. The
  // image wipes in while the two cards rise one after another. Elements are held
  // hidden via `[data-hero-anim]` in globals.css so nothing flashes first, and
  // it runs on mount (no data gate needed — there is no split text to wait for,
  // so the API copy can swap in later without disturbing the animation).
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(root.querySelectorAll("[data-hero-anim]"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        // Explicit `fromTo` throughout (never `from`) so a client-nav remount
        // can't strand the image or cards at their hidden start.
        .fromTo(
          "[data-feat-media]",
          { opacity: 0, scale: 1.06, clipPath: "inset(0% 100% 0% 0%)" },
          {
            opacity: 1,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          "[data-hero-anim]:not([data-feat-media])",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.18 },
          0.3
        );
    }, root);

    return () => ctx.kill();
  }, []);

  return (
    <Container className="flex flex-col items-center w-full">
      <div
        ref={rootRef}
        className="flex flex-col gap-3 items-start w-full lg:flex-row lg:gap-5"
      >
        {/* Wipes open from the left on load while the copy rises in on the right. */}
        <div
          data-hero-anim
          data-feat-media
          className="border border-[#e7e7ea] relative rounded-2xl h-[248px] w-full overflow-hidden lg:rounded-[20px] lg:self-stretch lg:flex-1 lg:min-w-0 lg:h-auto"
        >
          <Parallax amount={26} className="absolute inset-x-0 -inset-y-[18%]">
            <Image
              src={about?.image ?? aboutFeature}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Parallax>
        </div>
        <div className="flex flex-col gap-3 items-start justify-center w-full lg:gap-5 lg:flex-1 lg:min-w-0">
          <div
            data-hero-anim
            className="bg-white border border-[#e7e7ea] flex flex-col gap-4 items-start px-3.5 py-4 rounded-2xl w-full lg:gap-10 lg:px-7 lg:py-6 lg:rounded-[20px]"
          >
            <p className="font-medium text-[#040711] text-xl leading-7 tracking-[0.2px] whitespace-nowrap lg:text-[32px] lg:leading-10 lg:tracking-[0.32px]">
              {about?.title_1 ?? "Missiyamız"}
            </p>
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              {about?.description_1 ??
                "Neoline olaraq missiyamız bizneslərin rəqəmsal transformasiya prosesini sürətləndirən, innovativ və etibarlı proqram təminatı həlləri təqdim etməkdir. Müştərilərimizin qarşılaşdığı problemləri dərindən analiz edərək onların fəaliyyətinə real dəyər qatan fərdi həllər hazırlayırıq. Hər layihədə istifadəçi təcrübəsini, funksionallığı və texnoloji mükəmməlliyi əsas prioritet kimi qəbul edirik."}
            </p>
          </div>
          <div
            data-hero-anim
            className="bg-[#0d153a] border border-[#e7e7ea] flex flex-col gap-4 items-start px-3.5 py-4 rounded-2xl w-full text-[#e7e7ea] lg:gap-10 lg:px-7 lg:py-6 lg:rounded-[20px]"
          >
            <p className="font-medium text-xl leading-7 tracking-[0.2px] whitespace-nowrap lg:text-[32px] lg:leading-10 lg:tracking-[0.32px]">
              {about?.title_2 ?? "Gələcəyə Baxışımız"}
            </p>
            <p className="text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              {about?.description_2 ??
                "Məqsədimiz innovativ yanaşması, texniki peşəkarlığı və yüksək xidmət keyfiyyəti ilə seçilən aparıcı proqram təminatı şirkətlərindən birinə çevrilməkdir. Texnologiyanın daim dəyişən dünyasında yenilikləri izləməklə kifayətlənmir, onları bizneslər üçün praktik və effektiv həllərə çeviririk. Gələcək vizyonumuz müxtəlif sahələrdə fəaliyyət göstərən şirkətlərin rəqəmsal inkişafına töhfə verməkdir."}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
