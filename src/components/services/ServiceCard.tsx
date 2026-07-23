import Image from "next/image";
import type { ServiceListItem } from "@/lib/data/services";

export function ServiceCard({
  variant,
  size,
  title,
  description,
  image,
}: Pick<ServiceListItem, "variant" | "size" | "title" | "description" | "image">) {
  const isDark = variant === "dark";

  return (
    <div
      className={`border border-[#e7e7ea] flex gap-8 items-center p-3.5 rounded-[14px] min-w-0 w-full lg:px-8 lg:py-7 lg:rounded-2xl ${
        size === "wide" ? "lg:flex-[812]" : "lg:flex-[604]"
      } ${isDark ? "bg-[#0d153a]" : "bg-white"}`}
    >
      <div className="flex flex-col gap-4 items-center w-full lg:gap-9">
        <div className="flex flex-col gap-2.5 items-start w-full lg:gap-3">
          <p
            className={`font-semibold text-xl leading-7 tracking-[0.2px] w-full lg:font-medium lg:text-2xl lg:leading-8 lg:tracking-[0.24px] ${
              isDark ? "text-white" : "text-[#040711]"
            }`}
          >
            {title}
          </p>
          <p
            className={`text-sm leading-5 tracking-[0.14px] w-full lg:text-base lg:leading-6 lg:tracking-[0.16px] ${
              isDark ? "text-[#b3b5bc]" : "text-[#3b4153]"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="relative h-[192px] w-full lg:h-[336px]">
          <Image src={image} alt="" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
