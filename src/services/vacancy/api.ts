import { get } from '@/lib/api'

export interface VacancyApiItem {
  /** Present on some responses; needed by the apply form (`vacancy_id`). */
  id?: number
  name: string
  slug: string
  type: string
  /** Rich HTML: "Vakansiya haqqında". */
  about: string
  /** Rich HTML: requirements list ("Namizəddən gözləntilər"). */
  offer: string
  /** Rich HTML: offers list ("Təkliflərimiz"). */
  expectations: string
  deadline: string
  description: string
}

interface VacancyListResponse {
  data: VacancyApiItem[]
}

interface VacancyShowResponse {
  data: VacancyApiItem
}

/** GET /vacancies — all open vacancies, paginated (we only consume `data`). */
export const getVacancies = async (): Promise<VacancyApiItem[]> => {
  const response = await get<VacancyListResponse>('/vacancies')
  return response.data
}

/** GET /vacancy/show/{slug} — a single vacancy's full record. */
export const getVacancyBySlug = async (slug: string): Promise<VacancyApiItem> => {
  const response = await get<VacancyShowResponse>(`/vacancy/show/${slug}`)
  return response.data
}
