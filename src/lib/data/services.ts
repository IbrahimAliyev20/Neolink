import type { StaticImageData } from "next/image";
import type { ServiceApiItem } from "@/services/service/api";

/** Local images are static imports; API services supply plain URL strings. */
export type ServiceImage = string | StaticImageData;

export interface ServiceListItem {
  slug: string;
  variant: "dark" | "light";
  size: "wide" | "narrow";
  title: string;
  description: string;
  image: ServiceImage;
}

/**
 * Map API services onto the alternating dark/light, wide/narrow card grid the
 * services page uses: each row pairs one wide (dark) and one narrow (light)
 * card, with the wide card swapping sides every row.
 */
export function mapApiServices(items: ServiceApiItem[]): ServiceListItem[] {
  return items.map((item, index) => {
    const row = Math.floor(index / 2);
    const col = index % 2;
    const isWide = row % 2 === 0 ? col === 0 : col === 1;

    return {
      slug: item.slug,
      variant: isWide ? "dark" : "light",
      size: isWide ? "wide" : "narrow",
      title: item.name,
      description: item.short_description,
      image: item.image,
    };
  });
}
