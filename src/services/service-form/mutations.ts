import { useMutation } from '@tanstack/react-query'
import { postServiceForm } from './api'

export const useServiceForm = () => {
  return useMutation({
    mutationFn: postServiceForm,
  })
}
