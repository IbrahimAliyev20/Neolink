import { useMutation } from '@tanstack/react-query'
import { postContactForm } from './api'

export const useContactForm = () => {
  return useMutation({
    mutationFn: postContactForm,
  })
}
