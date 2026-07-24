import { useMutation } from '@tanstack/react-query'
import { postVacancyForm } from './api'

export const useVacancyForm = () => {
  return useMutation({
    mutationFn: postVacancyForm,
  })
}
