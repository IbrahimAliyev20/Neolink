import type { StaticImageData } from "next/image";
import type { ProjectApiItem } from "@/services/project/api";

/** Local images are static imports; API projects supply plain URL strings. */
export type ProjectImage = string | StaticImageData;

export interface ProjectDetailSection {
  number: string;
  title: string;
  paragraphs: string[];
}

export interface Project {
  slug: string;
  category: string;
  tags: string[];
  /** Absent for API projects (the endpoint returns no date). */
  date?: string;
  title: string;
  description: string;
  image: ProjectImage;
  client?: string;
  duration?: string;
  field?: string;
  heroImage?: ProjectImage;
  detailSections?: ProjectDetailSection[];
  gallery?: ProjectImage[];
}

/**
 * Map an API project record onto the shape the cards and detail page render.
 * The detail-section titles are localized in the detail page (not here), so
 * this mapper only carries the hero, gallery and card data.
 */
export function mapApiProject(item: ProjectApiItem): Project {
  // The API can omit `projecttags`/`images` entirely; guard so a missing field
  // doesn't crash the map with a "cannot read [0] of undefined".
  const tags = Array.isArray(item.projecttags) ? item.projecttags : [];
  return {
    slug: item.slug,
    category: tags[0] ?? "",
    tags,
    title: item.name,
    description: item.about,
    image: item.image,
    heroImage: item.image,
    client: item.company || undefined,
    duration: item.duration || undefined,
    field: tags[0],
    gallery: Array.isArray(item.images) ? item.images : [],
  };
}
