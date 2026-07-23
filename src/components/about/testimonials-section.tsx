"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { ClipReveal } from "@/components/animation/clip-reveal";
import { Parallax } from "@/components/animation/parallax";
import { Reveal } from "@/components/animation/reveal";
import { SplitLines } from "@/components/animation/split-lines";
import Container from "@/components/shared/container";
import { useCollaborations } from "@/services/collaborations/queries";
import { useSectionTitle } from "@/services/section-title/queries";
import aboutTestimonialFeature from "../../../public/images/about-testimonial-feature.jpg";
import aboutContactArt from "../../../public/images/about-contact-art.png";

/** The API quote arrives already wrapped in quote marks — strip them, the card
 *  renders its own. */
const stripQuotes = (text: string) => text.replace(/^"+|"+$/g, "");

export function TestimonialsSection() {
  const { data: testimonials = [] } = useCollaborations();
  const { data: sectionTitle } = useSectionTitle("Collaboration");
  const [index, setIndex] = useState(0);

  // Figma colours the last word teal; the API sends the title as plain text.
  const titleWords = (
    sectionTitle?.title ?? "Etibarla Qurulan Əməkdaşlıqlar!"
  ).split(" ");
  const titleStart = titleWords.slice(0, -1).join(" ");
  const titleAccent = titleWords[titleWords.length - 1];

  const count = testimonials.length;
  const current = testimonials[Math.min(index, Math.max(count - 1, 0))];

  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  return (
    <div className="flex flex-col items-center w-full py-9 lg:pt-0 lg:pb-[90px]">
      <Container className="flex flex-col items-center gap-6 w-full lg:gap-11">
        <div className="flex flex-col gap-4 items-start w-full lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <SplitLines>
            <h2 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[48px] lg:leading-[64px] lg:tracking-normal lg:max-w-[424px] lg:shrink-0">
              {titleStart} <span className="text-[#3abdaa]">{titleAccent}</span>
            </h2>
          </SplitLines>
          <Reveal
            y={44}
            blur={8}
            className="w-full lg:max-w-[656px] lg:flex-1 lg:min-w-0"
          >
            <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
              {sectionTitle?.description ??
                "Hər uğurlu layihənin arxasında etibar, şəffaf əməkdaşlıq və ortaq məqsədlər dayanır. Müştərilərimizin fikirləri bizim üçün yalnız rəy deyil, davamlı inkişafımızın ən dəyərli göstəricisidir."}
            </p>
          </Reveal>
        </div>

        {/* Quote column rises, the contact card swings in from the right. */}
        <Reveal
          y={80}
          scale={0.94}
          stagger={0.28}
          className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start w-full"
        >
          <div className="flex flex-col gap-4 lg:gap-5 items-start flex-[858] min-w-0 w-full">
            <div className="bg-[#0d153a] border border-[#8e929c] flex flex-col items-start justify-between gap-6 px-3.5 py-3.5 rounded-2xl w-full lg:gap-0 lg:h-[336px] lg:px-9 lg:py-8 lg:rounded-[20px]">
              <p className="font-semibold text-base leading-6 tracking-[0.16px] lg:text-[20px] lg:leading-7 lg:tracking-[0.2px]">
                <span className="text-white">
                  {String(count ? index + 1 : 0).padStart(2, "0")}
                </span>
                <span className="text-[#b3b5bc]">
                  /{String(count).padStart(2, "0")}
                </span>
              </p>
              <p className="font-normal text-white text-base leading-6 tracking-[0.16px] lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
                {current ? `"${stripQuotes(current.description)}"` : ""}
              </p>
              <div className="flex items-end justify-between w-full">
                <div className="flex flex-col gap-1 lg:gap-1.5 items-start">
                  <p className="font-medium text-[#3abdaa] text-base leading-6 tracking-[0.16px] lg:font-semibold lg:text-xl lg:leading-7 lg:tracking-[0.2px]">
                    {current?.name}
                  </p>
                  <p className="text-[#b3b5bc] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                    {current ? `${current.profession} | ${current.company}` : ""}
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    aria-label="Əvvəlki rəy"
                    onClick={goPrev}
                    disabled={count < 2}
                    className="bg-white/12 flex items-center justify-center p-2 rounded-full cursor-pointer transition-colors enabled:hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    aria-label="Növbəti rəy"
                    onClick={goNext}
                    disabled={count < 2}
                    className="bg-white/12 flex items-center justify-center p-2 rounded-full cursor-pointer transition-colors enabled:hover:bg-white/20 disabled:opacity-50"
                  >
                    <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
            <ClipReveal className="border border-[#e7e7ea] relative rounded-2xl w-full h-[200px] overflow-hidden lg:rounded-[20px] lg:h-[336px]">
              <Parallax amount={26} className="absolute inset-x-0 -inset-y-[18%]">
                <Image
                  src={sectionTitle?.image ?? aboutTestimonialFeature}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 60vw, 100vw"
                />
              </Parallax>
            </ClipReveal>
          </div>

          <div className="bg-white border border-[#e7e7ea] rounded-2xl flex-[558] min-w-0 w-full h-[425px] overflow-hidden flex flex-col lg:rounded-[20px] lg:h-[692px]">
            <div className="relative w-full overflow-hidden shrink-0" style={{ aspectRatio: "558 / 495" }}>
              <Image
                src={aboutContactArt}
                alt=""
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col gap-4 items-start px-3.5 pb-3.5 flex-1 justify-end lg:gap-6 lg:px-8 lg:pb-8">
              <div className="flex flex-col gap-2 items-start w-full lg:gap-3">
                <p className="font-medium text-[#040711] text-base leading-6 tracking-[0.16px] lg:text-2xl lg:leading-8 lg:tracking-[0.24px]">
                  Başlamağa hazırsınız?
                </p>
                <p className="text-[#5b606f] text-xs leading-4 tracking-[0.12px] lg:text-sm lg:leading-5 lg:tracking-[0.14px]">
                  Məqsədlərinizi anlayır, ehtiyaclarınıza uyğun həllər hazırlayır və
                  layihənizi uğurla həyata keçiririk.
                </p>
              </div>
              <button
                type="button"
                className="bg-[#0d153a] flex gap-4 h-10 items-center justify-center px-6 py-2.5 rounded-full w-full lg:h-12 lg:py-3"
              >
                <span className="font-medium text-[#3abdaa] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
                  Gəlin başlayaq
                </span>
                <ArrowUpRight className="h-5 w-5 lg:h-6 lg:w-6 text-[#3abdaa]" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
