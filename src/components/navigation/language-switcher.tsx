"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Locale switcher. `usePathname` / `useRouter` come from the next-intl
 * navigation helpers, so switching keeps you on the same page and just swaps the
 * URL's locale segment (az has no prefix, en/ru are `/en`, `/ru`).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const change = (next: string) => {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        aria-label={t("aria")}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1 rounded-full border border-[#e7e7ea] px-3 py-2 text-sm font-medium text-[#3b4153] transition-colors hover:border-[#20201e]"
      >
        {t(locale)}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {open && (
        <ul className="absolute right-0 top-full z-50 mt-2 min-w-[60px]  text-center  overflow-hidden rounded-xl border border-[#e7e7ea] bg-white py-1 shadow-[0px_16px_40px_0px_rgba(0,0,0,0.12)]">
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => change(loc)}
                className={`flex w-full cursor-pointer items-center text-center px-4 py-2.5 pl-4.5 text-sm transition-colors hover:bg-[#f7f7f7] ${
                  loc === locale ? "font-semibold text-neo-ink" : "text-[#5b606f]"
                }`}
              >
                {t(`${loc}Full`)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
