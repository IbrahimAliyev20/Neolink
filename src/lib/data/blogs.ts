import type { StaticImageData } from "next/image";
import type { BlogApiItem } from "@/services/blog/api";

/** Local images are static imports; API blogs supply plain URL strings. */
export type BlogImage = string | StaticImageData;

export type BlogTextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type BlogContentSection =
  | { type: "text"; heading: string; blocks: BlogTextBlock[] }
  | { type: "gallery"; images: [BlogImage, BlogImage] };

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

const AZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

/** Format an ISO date string as "27 iyul 2026". */
export function formatBlogDate(dateString: string): string | undefined {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return undefined;
  return `${date.getDate()} ${AZ_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Map an API blog record onto the shape the cards already render. */
export function mapApiBlog(item: BlogApiItem): BlogPost {
  return {
    slug: item.slug,
    category: item.tag,
    date: item.created_at,
    dateLabel: formatBlogDate(item.created_at),
    title: item.name,
    excerpt: stripHtml(item.description),
    image: item.image,
    coverImage: item.image,
    readTime: item.read_time ?? undefined,
  };
}
