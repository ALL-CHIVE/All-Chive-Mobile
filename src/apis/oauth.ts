import { SignInType } from '@/models/enums/SignInType'

import { client } from './client'

/**
 * signUpUser
 */
export const signUpUser = (
  provider: SignInType,
  idToken: string,
  profileImgUrl: string,
  nickname: string,
  categories: string[]
) => {
  return client.post(`/auth/oauth/register/${provider}?idToken=${idToken}`, {
    profileImgUrl,
    nickname,
    categories,
  })
}

/**
 * postIdTokenLogin
 */
export const postIdTokenLogin = (type: string, idToken: string) => {
  return client.post(`/auth/oauth/login/${type}/idtoken?idToken=${idToken}`)
}
