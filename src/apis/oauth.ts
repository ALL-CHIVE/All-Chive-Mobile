import { SignInType } from '@/models/enums/SignInType'

import { client } from './client'

/**
 * signUpUser
 */
export const signUpUser = (
  provider: SignInType,
  idToken: string,
  oauthAccessToken: string,
  profileImgUrl: string,
  nickname: string,
  categories: string[],
  marketingAgreement: boolean
) => {
  return client.post(
    `/auth/oauth/register/${provider}?idToken=${idToken}&oauthAccessToken=${oauthAccessToken}`,
    {
      profileImgUrl,
      nickname,
      categories,
      marketingAgreement,
    }
  )
}

/**
 * postIdTokenLogin
 */
export const postIdTokenLogin = (type: string, idToken: string) => {
  return client.post(`/auth/oauth/login/${type}/idtoken?idToken=${idToken}`)
}
