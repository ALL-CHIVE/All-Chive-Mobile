import { SignInType } from './enums/SignInType'

export interface SignInResult {
  canLogin: boolean
  signInType: SignInType
  idToken?: string
  accessToken?: string
  email?: string
  name?: string
}
