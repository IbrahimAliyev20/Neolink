import { CountUp } from "@/components/animation/count-up";
import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  /** Teal filled variant used for the highlighted stat. */
  accent?: boolean;
  className?: string;
};

/**
 * Figma: `Statistics-card` — 109x105, r8, p10, content vertically centred on
 * mobile; 257x125, r12, p20 on desktop. Background blur 32 in both.
 */
export function StatCard({ value, label, accent, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[105px] w-full flex-col justify-center overflow-hidden rounded-[8px] p-[10px] backdrop-blur-[16px] lg:min-h-0 lg:max-w-[257px] lg:justify-start lg:rounded-[12px] lg:p-5",
        accent ? "bg-neo-teal-soft" : "bg-neo-surface",
        className
      )}
    >
      <div className="flex flex-col gap-[5px]">
        <span
          className={cn(
            "text-[20px] leading-[28px] font-semibold tracking-[0.01em] lg:text-[40px] lg:leading-[56px] lg:font-medium",
            accent ? "text-white" : "text-neo-ink"
          )}
        >
          <CountUp value={value} delay={0.5} />
        </span>
        <span
          className={cn(
            "text-[12px] leading-[16px] font-normal tracking-[0.01em] lg:text-[16px] lg:leading-[24px]",
            accent ? "text-white" : "text-neo-muted"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
