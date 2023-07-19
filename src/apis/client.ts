import axios from 'axios'
import Config from 'react-native-config'

import { SignInType } from '@/models/enums/SignInType'

const BASE_URL = Config.ALLCHIVE_STAGE_SERVER

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})

/**
 * postIdTokenLogin
 */
export const postIdTokenLogin = (type: string, idToken: string) => {
  return client.post(`/auth/oauth/login/${type}/idtoken?idToken=${idToken}`)
}

/**
 * checkNicknameValid
 */
export const checkNicknameValid = (nickname: string) => {
  return client.post(`/user/nickname`, { nickname })
}

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
  return client.post(`/auth/oauth/register/${provider.toUpperCase()}?idToken=${idToken}`, {
    profileImgUrl,
    nickname,
    categories,
  })
}
