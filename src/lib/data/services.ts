import cyberImage from "../../../public/service/Cyber.png";
import cloudImage from "../../../public/service/Cloude.png";
import devopsImage from "../../../public/service/DevOps.png";
import itConsultingImage from "../../../public/service/IT consulting.png";
import type { ServiceSlug } from "./service-details";

export interface ServiceListItem {
  slug: ServiceSlug;
  variant: "dark" | "light";
  size: "wide" | "narrow";
  title: string;
  description: string;
  image: typeof cyberImage;
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
