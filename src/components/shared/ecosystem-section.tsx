import Image from "next/image";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";

/** Figma: `Partner` — 160x82 mobile / 195x100 desktop, r12, border #E7E7EA. */
function PartnerCard() {
  return (
    <div className="bg-white border border-[#e7e7ea] flex h-[82px] items-center justify-center px-[34px] py-7 rounded-xl w-[160px] lg:h-[100px] lg:w-[195px]">
      <div className="flex gap-2.5 items-center">
        <Image
          src="/icons/partner-triangle.svg"
          alt=""
          width={32}
          height={32}
          className="h-6 w-6 lg:h-8 lg:w-8"
        />
        <p className="font-semibold leading-7 text-[20px] tracking-[0.01em] text-[#3b4153] whitespace-nowrap lg:leading-9 lg:text-[28px]">
          Neolit
        </p>
      </div>
    </div>
  );
}

function createPartnerLogos(): LogoItem[] {
  return Array.from({ length: 6 }, (_, index) => ({
    node: <PartnerCard key={index} />,
    ariaLabel: "Neolit",
  }));
}

/** The row gap is driven by a CSS variable so it can stay responsive (Figma: 10
 *  mobile / 16 desktop) — `LogoLoop` only takes a fixed number for `gap`. */
const loopGap = { "--logoloop-gap": "var(--partner-gap)" } as React.CSSProperties;

/**
 * Figma mobile: `Home-statistics` (375x374) — py 36, column gap 24, centred
 * heading (gap 12) above two partner rows (gap 10) of 160x82 cards.
 */
export function EcosystemSection() {
  return (
    <div className="bg-white flex flex-col gap-6 items-center justify-center py-9 w-full lg:gap-12 lg:pt-0 lg:pb-[90px]">
      <Reveal
        stagger={0.12}
        className="flex flex-col gap-3 items-center text-center max-w-[788px] px-4 lg:gap-6"
      >
        <h2 className="font-semibold text-[#1c1c1e] text-[20px] leading-7 tracking-[0.01em] md:text-[32px] md:leading-[44px] lg:text-[40px] lg:leading-[56px]">
          Bütün İT Ekosisteminiz
        </h2>
        <p className="text-[#5b606f] text-[12px] leading-4 tracking-[0.01em] max-w-[756px] md:text-base md:leading-6">
          Heç bir maliyyə öhdəliyi tələb etməyən texniki auditlə başlayın. Mövcud
          sistemlərinizi qiymətləndirəcəyik, zəif nöqtələri aşkarlayacaq və aydın fəaliyyət
          planı təqdim edəcəyik.
        </p>
      </Reveal>
      <Container className="flex flex-col gap-[10px] items-center w-full [--partner-gap:10px] lg:gap-4 lg:[--partner-gap:16px]">
        <LogoLoop
          logos={createPartnerLogos()}
          direction="right"
          speed={40}
          style={loopGap}
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Partnyor loqoları"
        />
        <LogoLoop
          logos={createPartnerLogos()}
          direction="left"
          speed={40}
          style={loopGap}
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Partnyor loqoları"
        />
      </Container>
    </div>
  );
}
