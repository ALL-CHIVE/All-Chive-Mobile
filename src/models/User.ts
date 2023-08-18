import { SignInType } from './enums/SignInType'

export interface UserInfoResponse {
  imgUrl: string
  email: string
  name: string
  nickname: string
  oauthProvider: SignInType
}

export interface UserResponse {
  nickname: string
  imgUrl: string
  linkCount: number
  imgCount: number
  publicArchivingCount: number
  archivingCount: number
}
