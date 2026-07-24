import { CountUp } from "@/components/animation/count-up";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  /** Teal filled variant used for the highlighted stat. */
  accent?: boolean;
  className?: string;
  /** Gate the count-up so it only runs once the card is revealed / data is in. */
  countEnabled?: boolean;
  /** Stagger the count-up start to line up with the card reveal. */
  countDelay?: number;
};

/**
 * Figma: `Statistics-card` — 109x105, r8, p10, content vertically centred on
 * mobile; 257x125, r12, p20 on desktop. Background blur 32 in both.
 *
 * Desktop sizes are written in `--hero-u` (see `.hero-scale` in globals.css) so
 * the cards scale with the rest of the hero instead of staying fixed while the
 * type around them shrinks.
 */
export function StatCard({
  value,
  label,
  accent,
  className,
  countEnabled = true,
  countDelay = 0,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[105px] w-full flex-col justify-center overflow-hidden rounded-[8px] p-[10px] backdrop-blur-[16px] lg:min-h-0 lg:max-w-[calc(var(--hero-u,1px)*257)] lg:justify-start lg:rounded-[calc(var(--hero-u,1px)*12)] lg:p-[calc(var(--hero-u,1px)*20)]",
        accent ? "bg-neo-teal-soft" : "bg-neo-surface",
        className
      )}
    >
      <div className="flex flex-col gap-[5px] lg:gap-[calc(var(--hero-u,1px)*5)]">
        <span
          className={cn(
            "text-[20px] leading-[28px] font-semibold tracking-[0.01em] lg:text-[calc(var(--hero-u,1px)*40)] lg:leading-[calc(var(--hero-u,1px)*56)] lg:font-medium",
            accent ? "text-white" : "text-neo-ink"
          )}
        >
          <CountUp value={value} delay={countDelay} enabled={countEnabled} />
        </span>
        <span
          className={cn(
            "text-[12px] leading-[16px] font-normal tracking-[0.01em] lg:text-[calc(var(--hero-u,1px)*16)] lg:leading-[calc(var(--hero-u,1px)*24)]",
            accent ? "text-white" : "text-neo-muted"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
