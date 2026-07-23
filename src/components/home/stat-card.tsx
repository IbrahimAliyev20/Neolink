import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  /** Teal filled variant used for the highlighted stat. */
  accent?: boolean;
  className?: string;
};

/** Figma: `Statistics-card` — 257x125, r12, p20, background blur 32. */
export function StatCard({ value, label, accent, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[257px] overflow-hidden rounded-[12px] p-5 backdrop-blur-[16px]",
        accent ? "bg-neo-teal-soft" : "bg-neo-surface",
        className
      )}
    >
      <div className="flex flex-col gap-[5px]">
        <span
          className={cn(
            "text-[40px] leading-[56px] font-medium tracking-[0.01em]",
            accent ? "text-white" : "text-neo-ink"
          )}
        >
          {value}
        </span>
        <span
          className={cn(
            "text-[16px] leading-[24px] font-normal tracking-[0.01em]",
            accent ? "text-white" : "text-neo-muted"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
