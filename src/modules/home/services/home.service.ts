import { SignInRequestProps } from '@src/core'
import { ApiService } from '../../../core/services/api.service'

export const signIn = (body: SignInRequestProps) => {
  return ApiService.post('sign-in', body)
}
