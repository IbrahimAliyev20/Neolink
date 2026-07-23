import Container from "@/components/shared/container";

/** Figma: `vector-triangle` — 32px triangle glyph inside the partner wordmark. */
function TriangleMark() {
  return (
    <svg viewBox="0 0 32 32" width={32} height={32} aria-hidden className="h-8 w-8 shrink-0">
      <path
        d="M16 5.333 28 28H4L16 5.333Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Figma: `Partner` — 195x100, r12, p 28/34, gap 12. */
function PartnerCard() {
  return (
    <div className="flex h-[100px] w-[195px] shrink-0 items-center justify-center gap-3 rounded-[12px] border border-[#e7e7ea] bg-white px-[34px] py-7">
      {/* Figma: Frame 39 — row, gap 10 */}
      <div className="flex items-center gap-[10px]">
        <TriangleMark />
        <span className="font-k2d text-[28px] leading-[36px] font-semibold tracking-[0.01em]">
          Neolit
        </span>
      </div>
    </div>
  );
}

/**
 * One marquee row: the track holds two identical copies of the cards so the
 * translation loops seamlessly. Hovering the row pauses it and restores colour
 * (rows sit desaturated until then).
 */
function PartnerRow({
  count,
  reverse,
}: {
  count: number;
  reverse?: boolean;
}) {
  // A half must be at least as wide as the viewport, otherwise the loop would
  // expose a gap before the second copy scrolls in. Cards are 195 + 16 gap.
  const groupWidth = count * 211 - 16;
  const repeat = Math.ceil(1920 / groupWidth);
  const cards = Array.from({ length: count * repeat }, (_, index) => (
    <PartnerCard key={index} />
  ));

  return (
    <div className="marquee group relative overflow-hidden">
      <div
        className={`flex w-max gap-4 text-[#8e929c] grayscale transition-[filter,color] duration-300 group-hover:text-[#3b4153] group-hover:grayscale-0 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        <div className="flex shrink-0 gap-4">{cards}</div>
        <div aria-hidden className="flex shrink-0 gap-4">
          {cards}
        </div>
      </div>

      {/* Figma: edge cards fade out — kept as overlays so the loop stays seamless */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[116px] bg-gradient-to-r from-neo-page to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[116px] bg-gradient-to-l from-neo-page to-transparent" />
    </div>
  );
}

/**
 * Figma: `Frame 2147224637` (1920x572) — column, py 90, gap 48, centered.
 * Header `Frame 16` (788) + two 1440-wide clipped rows of `Partner` cards
 * (gap 16), here running as opposite-direction marquees.
 */
export function PartnersSection() {
  return (
    <section className="w-full py-[60px] 2xl:py-[90px]">
      <div className="flex flex-col gap-10 2xl:gap-12">
        {/* Figma: Frame 16 — column, gap 24, width 788, centered */}
        <Container className="flex flex-col items-center gap-4 2xl:gap-6">
          <h2 className="max-w-[788px] text-center text-[32px] leading-[44px] font-semibold tracking-[0.01em] text-[#1c1c1e] 2xl:text-[40px] 2xl:leading-[56px]">
            Bütün İT Ekosisteminiz
          </h2>
          <p className="max-w-[756px] text-center text-[16px] leading-[24px] font-normal tracking-[0.01em] text-neo-muted">
            Heç bir maliyyə öhdəliyi tələb etməyən texniki auditlə başlayın.
            Mövcud sistemlərinizi qiymətləndirəcəyik, zəif nöqtələri
            aşkarlayacaq və aydın fəaliyyət planı təqdim edəcəyik.
          </p>
        </Container>

        {/* Figma: Frame 2147223955 — column, gap 16, px 240 */}
        <Container className="flex flex-col gap-4 2xl:px-0">
          {/* Figma: Frame 38 — 8 cards, scrolling left */}
          <PartnerRow count={8} />
          {/* Figma: Frame 40 — 5 cards, scrolling right */}
          <PartnerRow count={5} reverse />
        </Container>
      </div>
    </section>
  );
}
