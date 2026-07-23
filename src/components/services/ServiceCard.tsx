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
      className={`border border-[#e7e7ea] flex gap-8 items-center px-8 py-7 rounded-2xl min-w-0 w-full ${
        size === "wide" ? "flex-[812]" : "flex-[604]"
      } ${isDark ? "bg-[#0d153a]" : "bg-white"}`}
    >
      <div className="flex flex-col gap-9 items-center w-full">
        <div className="flex flex-col gap-3 items-start w-full">
          <p
            className={`font-medium text-2xl leading-8 tracking-[0.24px] w-full ${
              isDark ? "text-white" : "text-[#040711]"
            }`}
          >
            {title}
          </p>
          <p
            className={`text-base leading-6 tracking-[0.16px] w-full ${
              isDark ? "text-[#b3b5bc]" : "text-[#3b4153]"
            }`}
          >
            {description}
          </p>
        </div>
        <div className="relative h-[336px] w-full">
          <Image src={image} alt="" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
}
