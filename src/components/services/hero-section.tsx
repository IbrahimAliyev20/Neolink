"use client";

import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("services.hero");

  return (
    <div className="flex flex-col gap-3 items-center text-center max-w-[343px] px-4 lg:gap-5 lg:max-w-[566px]">
      <h1 className="font-semibold text-[#1c1c1e] text-xl leading-7 tracking-[0.2px] lg:text-[40px] lg:leading-[56px] lg:tracking-[0.4px]">
        {t("heading")}
      </h1>
      <p className="text-[#5b606f] text-sm leading-5 tracking-[0.14px] lg:text-base lg:leading-6 lg:tracking-[0.16px]">
        {t("desc")}
      </p>
    </div>
  );
}
