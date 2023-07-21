import { client } from './client'

/**
 * checkNicknameValid
 */
export const checkNicknameValid = (nickname: string) => {
  return client.post(`/user/nickname`, { nickname })
}
