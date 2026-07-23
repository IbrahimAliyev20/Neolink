import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/shared/container";

/**
 * Figma desktop (node 3263:87776, 1920 canvas): four rotated project-card
 * thumbnails flank a centered title/description/CTA, with a hand-drawn arrow
 * pointing from the copy up to the button. Uses the same `.hero-scale` /
 * `--hero-u` unit as the home hero so the whole composition scales together
 * instead of reflowing. Below `lg` the cards are dropped and the copy stacks.
 */
function RotatedCard({
  className,
  boxClassName,
  rotate,
  src,
  faded,
}: {
  className: string;
  boxClassName: string;
  rotate: string;
  src: string;
  faded?: boolean;
}) {
  return (
    <div className={`absolute ${className}`}>
      <div className="flex size-full items-center justify-center">
        <div
          className={`relative overflow-hidden rounded-2xl border border-[#f2f4f8] ${boxClassName} ${rotate} ${
            faded ? "opacity-12" : ""
          }`}
        >
          <Image src={src} alt="" fill className="object-cover" sizes="30vw" />
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-scale relative w-full overflow-hidden bg-[#f7f7f7]">
      {/* Mobile / tablet: no decorative cards, simple centered copy */}
      <Container className="flex flex-col items-center gap-5 py-12 text-center lg:hidden">
        <h1 className="text-xl leading-7 font-semibold tracking-[0.2px] text-[#1c1c1e]">
          <span className="text-[#3abdaa]">Layihələrimizlə</span> yaxından tanış olun
        </h1>
        <p className="text-sm leading-5 tracking-[0.14px] text-[#5b606f]">
          Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
          fikirləri ilə gündəmdən geri qalmayın.
        </p>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#0d153a] px-6 text-sm font-medium tracking-[0.14px] text-white"
        >
          Təklif al
          <ArrowUpRight className="size-5" strokeWidth={1.5} />
        </button>
      </Container>

      {/* Desktop: pixel-accurate Figma composition, scaled via --hero-u */}
      <div className="relative mx-auto hidden w-full max-w-[1920px] lg:block lg:h-[calc(var(--hero-u)*520)]">
        <RotatedCard
          className="left-[calc(var(--hero-u)*333.33)] top-[calc(var(--hero-u)*317.9)] h-[calc(var(--hero-u)*160.153)] w-[calc(var(--hero-u)*194.848)]"
          boxClassName="h-[calc(var(--hero-u)*135.035)] w-[calc(var(--hero-u)*176.467)]"
          rotate="-rotate-[8.69deg]"
          src="/images/projects/hero/card-1.jpg"
          faded
        />
        <RotatedCard
          className="left-[calc(var(--hero-u)*200)] top-[calc(var(--hero-u)*73)] h-[calc(var(--hero-u)*330.16)] w-[calc(var(--hero-u)*394.285)]"
          boxClassName="h-[calc(var(--hero-u)*266.744)] w-[calc(var(--hero-u)*348.585)]"
          rotate="-rotate-[11.36deg]"
          src="/images/projects/hero/card-2.jpg"
        />
        <RotatedCard
          className="left-[calc(var(--hero-u)*1307)] top-[calc(var(--hero-u)*57)] h-[calc(var(--hero-u)*223.75)] w-[calc(var(--hero-u)*258.283)]"
          boxClassName="h-[calc(var(--hero-u)*167.828)] w-[calc(var(--hero-u)*219.321)]"
          rotate="rotate-[16.69deg]"
          src="/images/projects/hero/card-3.jpg"
          faded
        />
        <RotatedCard
          className="left-[calc(var(--hero-u)*1300)] top-[calc(var(--hero-u)*162)] h-[calc(var(--hero-u)*345.128)] w-[calc(var(--hero-u)*416.283)]"
          boxClassName="h-[calc(var(--hero-u)*285.245)] w-[calc(var(--hero-u)*372.763)]"
          rotate="rotate-[9.91deg]"
          src="/images/projects/hero/card-4.jpg"
        />

        <div className="absolute left-[calc(var(--hero-u)*650)] top-[calc(var(--hero-u)*145)] flex w-[calc(var(--hero-u)*620)] flex-col items-center gap-[calc(var(--hero-u)*36)]">
          <div className="relative flex w-full flex-col items-center gap-[calc(var(--hero-u)*20)] text-center">
            <h1 className="w-[calc(var(--hero-u)*592)] text-[calc(var(--hero-u)*48)] leading-[calc(var(--hero-u)*64)] font-semibold text-[#1c1c1e]">
              <span className="text-[#3abdaa]">Layihələrimizlə</span> yaxından tanış olun
            </h1>
            <p className="w-full text-[calc(var(--hero-u)*16)] leading-[calc(var(--hero-u)*24)] tracking-[0.16px] text-[#5b606f]">
              Texnologiya, innovasiya və rəqəmsal həllər haqqında ən aktual məqalələr və ekspert
              fikirləri ilə gündəmdən geri qalmayın.
            </p>

            <Image
              src="/images/projects/hero/arrow.svg"
              alt=""
              width={79}
              height={31}
              className="absolute left-[calc(var(--hero-u)*92)] top-[calc(var(--hero-u)*196)] w-[calc(var(--hero-u)*79)] rotate-[37.55deg]"
            />
          </div>

          <button
            type="button"
            className="flex h-[calc(var(--hero-u)*48)] items-center justify-center gap-[calc(var(--hero-u)*16)] rounded-full bg-[#0d153a] px-[calc(var(--hero-u)*24)] text-[calc(var(--hero-u)*16)] leading-[calc(var(--hero-u)*24)] font-medium tracking-[0.16px] text-white"
          >
            Təklif al
            <ArrowUpRight className="size-[calc(var(--hero-u)*24)]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
