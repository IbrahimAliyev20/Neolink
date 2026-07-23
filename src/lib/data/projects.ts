import projectMain from "../../../public/images/projects/project-main.jpg";
import detailHeroBg from "../../../public/images/projects/detail/hero-bg.jpg";
import detailGallery1 from "../../../public/images/projects/detail/gallery-1.jpg";
import detailGallery2 from "../../../public/images/projects/detail/gallery-2.jpg";
import project1 from "../../../public/images/projects/project-1.jpg";
import project2 from "../../../public/images/projects/project-2.jpg";
import project3 from "../../../public/images/projects/project-3.jpg";
import project4 from "../../../public/images/projects/project-4.jpg";
import project5 from "../../../public/images/projects/project-5.jpg";
import project6 from "../../../public/images/projects/project-6.jpg";
import project7 from "../../../public/images/projects/project-7.jpg";
import project8 from "../../../public/images/projects/project-8.jpg";

export const projectCategories = [
  "Rəqəmsal Transformasiya",
  "Bulud Texnologiyaları",
  "Texnologiya",
  "Biznes Həlləri",
  "Yeniliklər",
  "Süni İntellekt",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export interface ProjectDetailSection {
  number: string;
  title: string;
  paragraphs: string[];
}

export interface Project {
  slug: string;
  category: ProjectCategory;
  tags: string[];
  date: string;
  title: string;
  description: string;
  image: typeof projectMain;
  client?: string;
  duration?: string;
  field?: string;
  heroImage?: typeof projectMain;
  detailSections?: ProjectDetailSection[];
  gallery?: [typeof projectMain, typeof projectMain];
}

const title = "Korporativ İT İdarəetmə Platforması";
const description =
  "Şirkətlərin İT infrastrukturu, texniki dəstək, avadanlıqlar və təhlükəsizlik proseslərini vahid platforma üzərindən idarə etməsinə imkan verən kompleks həll.";

export const projects: Project[] = [
  {
    slug: "bulud-infrastrukturunun-idareetme-sistemi",
    category: "Rəqəmsal Transformasiya",
    tags: ["Bulud Texnologiyaları", "IT Texnologiyaları"],
    date: "2026-07-27",
    title: "Bulud İnfrastrukturunun İdarəetmə Sistemi",
    description:
      "Bulud resurslarının monitorinqi, idarə olunması və optimallaşdırılması üçün hazırlanmış korporativ platforma.",
    image: projectMain,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-1",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-24",
    title,
    description,
    image: project1,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-2",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-22",
    title,
    description,
    image: project2,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-3",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-20",
    title,
    description,
    image: project3,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-4",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-18",
    title,
    description,
    image: project4,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-5",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-16",
    title,
    description,
    image: project5,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-6",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-14",
    title,
    description,
    image: project6,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-7",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-12",
    title,
    description,
    image: project7,
  },
  {
    slug: "korporativ-it-idareetme-platformasi-8",
    category: "Rəqəmsal Transformasiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-10",
    title,
    description,
    image: project8,
  },
  {
    slug: "bulud-texnologiyalari-layihe-1",
    category: "Bulud Texnologiyaları",
    tags: ["Bulud Texnologiyaları", "IT Texnologiyaları"],
    date: "2026-07-25",
    title,
    description,
    image: project2,
    client: "Nexend Group",
    duration: "3 ay",
    field: "Bulud Texnologiyaları",
    heroImage: detailHeroBg,
    detailSections: [
      {
        number: "01",
        title: "Layihə Haqqında",
        paragraphs: [
          "Korporativ İT İdarəetmə Platforması, müəssisələrin İT əməliyyatlarını vahid ekosistem üzərindən idarə etməsi üçün hazırlanmış müasir və kompleks proqram təminatıdır. Platforma İT infrastrukturunun monitorinqi, texniki dəstək prosesləri, aktivlərin idarə olunması, DevOps əməliyyatları, bulud xidmətləri və kibertəhlükəsizlik funksiyalarını bir sistemdə birləşdirərək əməliyyatların daha səmərəli həyata keçirilməsini təmin edir.",
          "Layihənin əsas məqsədi fərqli platformalarda idarə olunan prosesləri mərkəzləşdirmək, məlumat axınını optimallaşdırmaq və qərarvermə prosesini sürətləndirmək idi. İstifadəçi yönümlü interfeys və çevik modul strukturu sayəsində sistem müxtəlif ölçülü müəssisələrin ehtiyaclarına uyğunlaşdırıla bilir. Bu yanaşma şirkətlərə vaxt itkisinin qarşısını almağa, resurslardan daha səmərəli istifadə etməyə və İT proseslərini daha effektiv idarə etməyə imkan yaradır.",
        ],
      },
      {
        number: "02",
        title: "Qarşıya Qoyulan Məqsəd",
        paragraphs: [
          "Müəssisələrdə İT proseslərinin müxtəlif proqramlar və əl ilə idarə olunması əməliyyatların mürəkkəbləşməsinə, məlumatların parçalanmasına və vaxt itkisinə səbəb olur. Texniki dəstək müraciətlərinin izlənilməsi, avadanlıqların idarə olunması, təhlükəsizlik nəzarəti və bulud resurslarının monitorinqi kimi vacib proseslərin vahid platformada olmaması idarəetmədə çətinliklər yaradır.",
          "Bu layihənin əsas məqsədi bütün bu prosesləri bir platformada birləşdirərək daha şəffaf, çevik və avtomatlaşdırılmış idarəetmə sistemi yaratmaq idi. Eyni zamanda rəhbərlərin real vaxt rejimində analitik məlumatlara çıxış əldə etməsi, texniki komandaların gündəlik iş yükünün azaldılması və təhlükəsizlik risklərinin minimuma endirilməsi layihənin prioritet hədəflərindən biri olmuşdur.",
        ],
      },
      {
        number: "03",
        title: "Təqdim Etdiyimiz Həll",
        paragraphs: [
          "Hazırlanan platforma modul əsaslı arxitektura üzərində qurularaq müəssisələrin bütün İT əməliyyatlarını vahid dashboard vasitəsilə idarə etməsinə imkan yaradır. Sistem Help Desk modulu ilə texniki dəstək müraciətlərinin idarə olunmasını, Asset Management bölməsi ilə avadanlıqların izlənilməsini, Cloud Management modulu ilə bulud resurslarının monitorinqini və DevOps inteqrasiyaları vasitəsilə proqram təminatının inkişaf proseslərini avtomatlaşdırır.",
          "Bundan əlavə, platformaya kibertəhlükəsizlik monitorinqi, istifadəçi səlahiyyətlərinin idarə olunması, audit qeydləri, analitik hesabatlar və bildiriş sistemi inteqrasiya edilmişdir. Müasir UX/UI prinsipləri əsasında hazırlanmış interfeys istifadəçilərə mürəkkəb prosesləri daha rahat idarə etməyə imkan verir. Nəticədə təşkilatlar daha sürətli qərarlar qəbul edir, əməliyyat xərclərini azaldır, məlumat təhlükəsizliyini gücləndirir və ümumi iş məhsuldarlığını əhəmiyyətli dərəcədə artırırlar.",
        ],
      },
    ],
    gallery: [detailGallery1, detailGallery2],
  },
  {
    slug: "texnologiya-layihe-1",
    category: "Texnologiya",
    tags: ["Proqram təminatı", "IT Texnologiyaları"],
    date: "2026-07-23",
    title,
    description,
    image: project3,
  },
  {
    slug: "biznes-helleri-layihe-1",
    category: "Biznes Həlləri",
    tags: ["Biznes Həlləri", "IT Texnologiyaları"],
    date: "2026-07-19",
    title,
    description,
    image: project5,
  },
  {
    slug: "yenilikler-layihe-1",
    category: "Yeniliklər",
    tags: ["Yeniliklər", "IT Texnologiyaları"],
    date: "2026-07-15",
    title,
    description,
    image: project6,
  },
  {
    slug: "suni-intellekt-layihe-1",
    category: "Süni İntellekt",
    tags: ["Süni İntellekt", "IT Texnologiyaları"],
    date: "2026-07-11",
    title,
    description,
    image: project7,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
