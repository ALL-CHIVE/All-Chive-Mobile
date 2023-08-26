import { SignInType } from '@/models/enums/SignInType'

import { client } from './client'

/**
 * 회원가입을 진행합니다.
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
    `/auth/oauth/register/${provider}`,
    {
      profileImgUrl,
      nickname,
      categories,
      marketingAgreement,
    },
    {
      params: {
        idToken,
        oauthAccessToken,
      },
    }
  )
}

/**
 * IdToken 으로 로그인 합니다.
 */
export const postIdTokenLogin = (type: string, idToken: string) => {
  return client.post(`/auth/oauth/login/${type}/idtoken`, null, {
    params: {
      idToken,
    },
  })
}
