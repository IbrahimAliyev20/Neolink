import { post } from '@/lib/api'

export interface ServiceFormPayload {
  name: string
  email: string
  phone: string
  /** The service the offer is requested for. */
  service: string
}

/** POST /service-form — the backend expects multipart form-data. */
export const postServiceForm = async (payload: ServiceFormPayload) => {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value)
  })

  // Content-Type (with boundary) is set automatically for FormData — see client.ts.
  return post('/service-form', formData)
}
