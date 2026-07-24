import { get, post } from '@/lib/api'

export interface ContactData {
  phone_1: string | null
  phone_2: string | null
  email_1: string | null
  email_2: string | null
  address: string | null
  map: string | null
}

interface ContactResponse {
  data: ContactData
}

export const getContact = async (): Promise<ContactData> => {
  const response = await get<ContactResponse>('/contact')
  return response.data
}

export interface ContactFormPayload {
  name: string
  email: string
  phone: string
  title: string
  note: string
}

/** POST /contact-form — the backend expects multipart form-data. */
export const postContactForm = async (payload: ContactFormPayload) => {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value)
  })

  // Content-Type (with boundary) is set automatically for FormData — see client.ts.
  return post('/contact-form', formData)
}
