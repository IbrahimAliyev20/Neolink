import { get } from '@/lib/api'

export interface ProjectApiItem {
  name: string
  slug: string
  image: string
  thumb_image: string
  about: string
  goal: string
  solution: string
  duration: string
  company: string
  /** Gallery image URLs. */
  images: string[]
  /** Tag names carried by the project. */
  projecttags: string[]
  meta_title: string
  meta_keywords: string
  meta_description: string
}

interface ProjectListResponse {
  data: ProjectApiItem[]
}

interface ProjectShowResponse {
  data: ProjectApiItem
}

/** GET /projects — all projects, paginated (we only consume `data`). */
export const getProjects = async (): Promise<ProjectApiItem[]> => {
  const response = await get<ProjectListResponse>('/projects')
  return response.data
}

/** GET /project-tag/{slug} — every project carrying the given tag. */
export const getProjectsByTag = async (slug: string): Promise<ProjectApiItem[]> => {
  const response = await get<ProjectListResponse>(`/project-tag/${slug}`)
  return response.data
}

/** GET /project/show/{slug} — a single project's full record. */
export const getProjectBySlug = async (slug: string): Promise<ProjectApiItem> => {
  const response = await get<ProjectShowResponse>(`/project/show/${slug}`)
  return response.data
}
