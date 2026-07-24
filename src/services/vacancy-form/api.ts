import { post } from '@/lib/api'

export interface VacancyFormPayload {
  name: string
  email: string
  cv: File
  vacancy_id: string
}

/** POST /vacancy-form — multipart form-data with the CV file. */
export const postVacancyForm = async (payload: VacancyFormPayload) => {
  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  formData.append('cv', payload.cv)
  formData.append('vacancy_id', payload.vacancy_id)

  return post('/vacancy-form', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
