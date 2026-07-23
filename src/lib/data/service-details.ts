import consultingHero from "../../../public/images/services/consulting-hero.jpg";

export type ServiceSlug = "cyber" | "cloud" | "devops" | "consulting";

export interface WhatIncludedItem {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: ServiceSlug;
  title: string;
  description: string;
  heroImage: typeof consultingHero;
  whatIncludedTitle: string;
  whatIncludedDescription: string;
  whatIncluded: WhatIncludedItem[];
}

export const serviceDetails: Partial<Record<ServiceSlug, ServiceDetail>> = {
  consulting: {
    slug: "consulting",
    title: "İT Konsaltinq",
    description:
      "Neoline müasir bizneslərin rəqəmsal inkişafını dəstəkləyən innovativ proqram təminatı şirkətidir. Biz müəssisələrin ehtiyaclarına uyğun veb platformalar, mobil tətbiqlər, korporativ sistemlər və fərdi proqram həlləri hazırlayırıq. Məqsədimiz texnologiyanı sadəcə alət kimi deyil, bizneslərin inkişafına töhfə verən strateji dəyər kimi təqdim etməkdir. Hər bir layihəyə fərdi yanaşır, müştərilərimizin məqsəd və tələblərini dərindən analiz edərək ən uyğun həlli formalaşdırırıq.",
    heroImage: consultingHero,
    whatIncludedTitle: "Bu Xidmətə Nələr Daxildir ?",
    whatIncludedDescription:
      "Biznes ehtiyaclarınızı dərindən analiz edərək, daha təhlükəsiz, səmərəli və gələcəyə hazır İT infrastrukturu qurmağınıza kömək edirik. Təklif etdiyimiz həllər biznesinizin dayanıqlı inkişafını və rəqəmsal transformasiyasını dəstəkləyir.",
    whatIncluded: [
      {
        icon: "/icons/target-arrow.svg",
        title: "İT Strategiyasının Hazırlanması",
        description:
          "Mövcud biznes proseslərinizi təhlil edir, məqsədlərinizə uyğun uzunmüddətli və effektiv İT strategiyası hazırlayırıq.",
      },
      {
        icon: "/icons/target-arrow.svg",
        title: "İnfrastrukturun Optimallaşdırılması",
        description:
          "Server, şəbəkə və sistem infrastrukturunu analiz edərək etibarlılıq və təhlükəsizlik təkmilləşdirmə planı təqdim edirik.",
      },
      {
        icon: "/icons/shield-lock.svg",
        title: "Kibertəhlükəsizlik Qiymətləndirilməsi",
        description:
          "Mümkün təhlükələri müəyyən edir, məlumatların qorunması və sistemlərin təhlükəsizliyi üçün praktik həllər təklif edirik.",
      },
      {
        icon: "/icons/settings.svg",
        title: "Rəqəmsal Transformasiya",
        description:
          "Müasir texnologiyaların tətbiqi ilə biznes proseslərini avtomatlaşdırır, əməliyyat xərclərini azaldır və məhsuldarlığı artırır.",
      },
    ],
  },
};
