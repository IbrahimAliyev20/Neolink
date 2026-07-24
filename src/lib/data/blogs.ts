import type { StaticImageData } from "next/image";
import type { BlogApiItem } from "@/services/blog/api";
import blog1 from "../../../public/images/blog/blog-1.jpg";
import blog2 from "../../../public/images/blog/blog-2.jpg";
import blog3 from "../../../public/images/blog/blog-3.jpg";
import blog4 from "../../../public/images/blog/blog-4.jpg";
import blog5 from "../../../public/images/blog/blog-5.jpg";
import blog6 from "../../../public/images/blog/blog-6.jpg";
import blog7 from "../../../public/images/blog/blog-7.jpg";
import blog8 from "../../../public/images/blog/blog-8.jpg";
import blog9 from "../../../public/images/blog/blog-9.jpg";
import blog10 from "../../../public/images/blog/blog-10.jpg";
import detailCover from "../../../public/images/blog/detail/cover.jpg";
import detailGallery1 from "../../../public/images/blog/detail/gallery-1.jpg";
import detailGallery2 from "../../../public/images/blog/detail/gallery-2.jpg";

export const blogCategories = [
  "Rəqəmsal Transformasiya",
  "Bulud Texnologiyaları",
  "Texnologiya",
  "Biznes Həlləri",
  "Yeniliklər",
  "Süni İntellekt",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogTextBlock = { type: "paragraph"; text: string } | { type: "list"; items: string[] };

export type BlogContentSection =
  | { type: "text"; heading: string; blocks: BlogTextBlock[] }
  | { type: "gallery"; images: [typeof blog1, typeof blog1] };

/** Local images are static imports; API blogs supply plain URL strings. */
export type BlogImage = string | StaticImageData;

export interface BlogPost {
  slug: string;
  category: string;
  /** Absent for API blogs (the endpoint returns no date). */
  date?: string;
  dateLabel?: string;
  title: string;
  excerpt: string;
  image: BlogImage;
  readTime?: string;
  coverImage?: BlogImage;
  content?: BlogContentSection[];
}

/** Turn the API's rich HTML body into a plain-text excerpt for the cards. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Map an API blog record onto the shape the cards already render. */
export function mapApiBlog(item: BlogApiItem): BlogPost {
  return {
    slug: item.slug,
    category: item.tag,
    title: item.name,
    excerpt: stripHtml(item.description),
    image: item.image,
    coverImage: item.image,
    readTime: item.read_time ?? undefined,
  };
}

const title = "Müasir Bizneslər üçün Xüsusi Proqram Təminatının Üstünlükləri";
const excerpt =
  "Standart həllərdən fərqli olaraq, xüsusi proqram təminatı biznesinizin ehtiyaclarına uyğun hazırlanır, iş proseslərini optimallaşdırır və uzunmüddətli inkişaf üçün daha çevik imkanlar yaradır.";

export const blogPosts: BlogPost[] = [
  {
    slug: "reqemsal-transformasiya-1",
    category: "Rəqəmsal Transformasiya",
    date: "2026-07-27",
    dateLabel: "27 iyul 2026",
    title: "Müasir Bizneslər Üçün Xüsusi Proqram Təminatının Üstünlükləri",
    excerpt,
    image: blog1,
    readTime: "6-7 dəq. oxuma vaxtı",
    coverImage: detailCover,
    content: [
      {
        type: "text",
        heading: "Biznes Ehtiyaclarına Tam Uyğun Həllər",
        blocks: [
          {
            type: "paragraph",
            text: "Hər bir şirkətin fəaliyyət istiqaməti, iş prinsipləri və daxili prosesləri fərqlidir. Hazır proqram təminatları isə adətən geniş auditoriya üçün hazırlandığından bütün tələbləri qarşılamaya bilər. Xüsusi proqram təminatı biznesinizin mövcud iş axınına uyğun şəkildə hazırlanır və əlavə funksiyalarla zənginləşdirilə bilir. Bu yanaşma əməkdaşların gündəlik işini asanlaşdırır, təkrarlanan prosesləri avtomatlaşdırır və vaxt itkisinin qarşısını alır. Eyni zamanda məlumatların idarə olunmasını daha sistemli və təhlükəsiz edir. Şirkətin böyüməsi ilə birlikdə proqram da yeni funksiyalar əlavə edilərək inkişaf etdirilə bilər. Bu isə gələcəkdə tamamilə yeni sistemə keçid ehtiyacını azaldır. Nəticədə biznes daha çevik qərarlar qəbul edir və bazar dəyişikliklərinə daha sürətli uyğunlaşır. Fərdiləşdirilmiş proqram təminatı uzunmüddətli perspektivdə həm səmərəliliyi, həm də investisiya dəyərini artırır.",
          },
        ],
      },
      {
        type: "text",
        heading: "Əməliyyat Effektivliyinin və Məhsuldarlığın Artırılması",
        blocks: [
          {
            type: "paragraph",
            text: "Biznes proseslərinin avtomatlaşdırılması şirkətlər üçün ən böyük üstünlüklərdən biridir. Əl ilə görülən işlərin proqram vasitəsilə idarə olunması insan səhvlərini minimuma endirir və əməkdaşların daha vacib tapşırıqlara fokuslanmasına imkan yaradır. Müxtəlif şöbələr arasında məlumat mübadiləsi daha sürətli və şəffaf şəkildə həyata keçirilir. Bu da qərarvermə prosesini xeyli sürətləndirir. Hesabatların avtomatik hazırlanması rəhbərliyə real vaxt rejimində vəziyyəti izləməyə kömək edir. Proqram təminatı resursların daha səmərəli idarə edilməsinə və əməliyyat xərclərinin optimallaşdırılmasına da töhfə verir. Bundan əlavə, sistemlər arasında inteqrasiyalar məlumatların təkrar daxil edilməsinin qarşısını alır. Nəticədə iş prosesləri daha stabil, məhsuldar və idarəolunan hala gəlir. Bu üstünlüklər şirkətin ümumi performansına birbaşa müsbət təsir göstərir.",
          },
        ],
      },
      {
        type: "text",
        heading: "Təhlükəsizlik və Gələcəyə Hazırlıq",
        blocks: [
          {
            type: "paragraph",
            text: "Rəqəmsal dövrdə məlumat təhlükəsizliyi hər bir biznes üçün prioritet məsələlərdən biridir. Xüsusi proqram təminatı hazırlanarkən təhlükəsizlik tələbləri layihənin ilk mərhələsindən nəzərə alınır. İstifadəçi səlahiyyətlərinin idarə olunması, məlumatların şifrələnməsi və ehtiyat nüsxələrinin yaradılması kimi funksiyalar sistemin etibarlılığını artırır. Bundan əlavə, proqram təminatı şirkətin böyüməsinə uyğun olaraq yeni modullar və funksiyalarla genişləndirilə bilər. Bu çeviklik biznesin dəyişən bazar şərtlərinə uyğunlaşmasını asanlaşdırır. Müasir texnologiyalarla inteqrasiya imkanları isə sistemin aktuallığını uzun illər qoruyub saxlayır. Davamlı texniki dəstək və müntəzəm yeniləmələr proqramın təhlükəsiz və stabil işləməsini təmin edir. Beləliklə, şirkətlər yalnız bugünkü ehtiyaclarını deyil, gələcək inkişaf planlarını da etibarlı şəkildə dəstəkləyən rəqəmsal həll əldə etmiş olurlar. Uzunmüddətli perspektivdə bu yanaşma həm riskləri azaldır, həm də biznesin davamlı inkişafına töhfə verir.",
          },
        ],
      },
      { type: "gallery", images: [detailGallery1, detailGallery2] },
      {
        type: "text",
        heading: "Biznesiniz Nə Qazanır?",
        blocks: [
          {
            type: "paragraph",
            text: "Hazır həllər bir çox biznes üçün kifayət etsə də, inkişaf etdikcə fərdi ehtiyaclar da artır. Xüsusi proqram təminatı iş proseslərini optimallaşdırır, məhsuldarlığı yüksəldir və biznesinizin gələcək inkişafı üçün çevik infrastruktur yaradır. Bu yanaşma həm əməliyyat xərclərini azaldır, həm də rəqabət üstünlüyü əldə etməyə kömək edir.",
          },
          {
            type: "list",
            items: [
              "İş Proseslərinin Avtomatlaşdırılması",
              "Biznesə Uyğun Fərdiləşdirmə",
              "Digər Sistemlərlə İnteqrasiya",
              "Miqyaslana Bilən İnfrastruktur",
            ],
          },
          {
            type: "paragraph",
            text: "Beləliklə, şirkətlər yalnız bugünkü ehtiyaclarını deyil, gələcək inkişaf planlarını da etibarlı şəkildə dəstəkləyən rəqəmsal həll əldə etmiş olurlar. Uzunmüddətli perspektivdə bu yanaşma həm riskləri azaldır, həm də biznesin davamlı inkişafına töhfə verir.",
          },
          {
            type: "paragraph",
            text: "Beləliklə, şirkətlər yalnız bugünkü ehtiyaclarını deyil, gələcək inkişaf planlarını da etibarlı şəkildə dəstəkləyən rəqəmsal həll əldə etmiş olurlar. Uzunmüddətli perspektivdə bu yanaşma həm riskləri azaldır, həm də biznesin davamlı inkişafına töhfə verir.",
          },
        ],
      },
    ],
  },
  {
    slug: "reqemsal-transformasiya-2",
    category: "Rəqəmsal Transformasiya",
    date: "2026-07-20",
    dateLabel: "20 iyul 2026",
    title,
    excerpt,
    image: blog4,
  },
  {
    slug: "bulud-texnologiyalari-1",
    category: "Bulud Texnologiyaları",
    date: "2026-07-25",
    dateLabel: "25 iyul 2026",
    title,
    excerpt,
    image: blog2,
  },
  {
    slug: "bulud-texnologiyalari-2",
    category: "Bulud Texnologiyaları",
    date: "2026-07-18",
    dateLabel: "18 iyul 2026",
    title,
    excerpt,
    image: blog7,
  },
  {
    slug: "texnologiya-1",
    category: "Texnologiya",
    date: "2026-07-27",
    dateLabel: "27 iyul 2026",
    title,
    excerpt,
    image: blog3,
  },
  {
    slug: "texnologiya-2",
    category: "Texnologiya",
    date: "2026-07-21",
    dateLabel: "21 iyul 2026",
    title,
    excerpt,
    image: blog8,
  },
  {
    slug: "biznes-helleri-1",
    category: "Biznes Həlləri",
    date: "2026-07-24",
    dateLabel: "24 iyul 2026",
    title,
    excerpt,
    image: blog5,
  },
  {
    slug: "biznes-helleri-2",
    category: "Biznes Həlləri",
    date: "2026-07-17",
    dateLabel: "17 iyul 2026",
    title,
    excerpt,
    image: blog9,
  },
  {
    slug: "yenilikler-1",
    category: "Yeniliklər",
    date: "2026-07-22",
    dateLabel: "22 iyul 2026",
    title,
    excerpt,
    image: blog6,
  },
  {
    slug: "yenilikler-2",
    category: "Yeniliklər",
    date: "2026-07-15",
    dateLabel: "15 iyul 2026",
    title,
    excerpt,
    image: blog10,
  },
  {
    slug: "suni-intellekt-1",
    category: "Süni İntellekt",
    date: "2026-07-20",
    dateLabel: "20 iyul 2026",
    title,
    excerpt,
    image: blog9,
  },
  {
    slug: "suni-intellekt-2",
    category: "Süni İntellekt",
    date: "2026-07-14",
    dateLabel: "14 iyul 2026",
    title,
    excerpt,
    image: blog3,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
