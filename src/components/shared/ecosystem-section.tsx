"use client";

import Image from "next/image";
import { Reveal } from "@/components/animation/reveal";
import Container from "@/components/shared/container";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import { useLogos } from "@/services/logo/queries";
import type { LogoItem as ApiLogo } from "@/services/logo/api";

/** Figma: `Partner` — 160x82 mobile / 195x100 desktop, r12, border #E7E7EA. */
function PartnerCard({ logo }: { logo: ApiLogo }) {
  return (
    <div className="bg-white border border-[#e7e7ea] flex h-[82px] items-center justify-center px-[34px] py-7 rounded-xl w-[160px] lg:h-[100px] lg:w-[195px]">
      <Image
        src={logo.logo}
        alt=""
        width={195}
        height={100}
        className="h-full w-full object-contain"
      />
    </div>
  );
}

/** The API may return only a few logos — repeat them until the row has at
 *  least `MIN_ROW_ITEMS` cards so the marquee never looks empty. */
const MIN_ROW_ITEMS = 8;

function createPartnerLogos(logos: ApiLogo[]): LogoItem[] {
  const repeats = Math.ceil(MIN_ROW_ITEMS / logos.length);
  const filled = Array.from({ length: repeats }, () => logos).flat();

  return filled.map((logo, index) => ({
    node: <PartnerCard key={index} logo={logo} />,
    href: logo.link,
    ariaLabel: "Partnyor",
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
  const { data: logos = [] } = useLogos();

  if (logos.length === 0) return null;

  const partnerLogos = createPartnerLogos(logos);

  return (
    <div className="flex flex-col gap-6 items-center justify-center py-9 w-full lg:gap-12 lg:pt-15 lg:pb-[90px]">
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
          logos={partnerLogos}
          direction="right"
          speed={40}
          style={loopGap}
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Partnyor loqoları"
        />
        <LogoLoop
          logos={partnerLogos}
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
