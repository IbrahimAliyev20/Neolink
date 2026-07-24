import type { StaticImageData } from "next/image";
import type { ServiceApiItem } from "@/services/service/api";
import cyberImage from "../../../public/service/Cyber.png";
import cloudImage from "../../../public/service/Cloude.png";
import devopsImage from "../../../public/service/DevOps.png";
import itConsultingImage from "../../../public/service/IT consulting.png";

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

export const services: ServiceListItem[] = [
  {
    slug: "cyber",
    variant: "dark",
    size: "wide",
    title: "Kibertəhlükəsizlik",
    description:
      "Müasir təhlükələrə qarşı sistemlərinizi qoruyur, məlumatlarınızın təhlükəsizliyini və biznesinizin fasiləsiz fəaliyyətini təmin edirik.",
    image: cyberImage,
  },
  {
    slug: "cloud",
    variant: "light",
    size: "narrow",
    title: "Bulud Xidmətləri",
    description:
      "Məlumatlarınızı təhlükəsiz bulud mühitinə daşıyır, çevik, etibarlı və istənilən yerdən əlçatan İT infrastrukturu qururuq.",
    image: cloudImage,
  },
  {
    slug: "devops",
    variant: "light",
    size: "narrow",
    title: "DevOps",
    description:
      "Avtomatlaşdırılmış inkişaf və yerləşdirmə prosesləri ilə yüksək performanslı, etibarlı və miqyaslana bilən proqram həlləri hazırlayırıq.",
    image: devopsImage,
  },
  {
    slug: "consulting",
    variant: "dark",
    size: "wide",
    title: "IT Konsaltinq",
    description:
      "Biznes ehtiyaclarınızı təhlil edir, strateji yanaşma ilə ən uyğun texnoloji həlləri planlaşdırıb tətbiq etməyə dəstək oluruq.",
    image: itConsultingImage,
  },
];
