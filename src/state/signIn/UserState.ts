import { atom } from 'recoil'

import { SignInType } from '@/models/enums/SignInType'

export const IdTokenState = atom<string>({
  key: 'idTokenState',
  default: '',
})

export const ThirdpartyAccessTokenState = atom<string>({
  key: 'ThirdpartyAccessTokenState',
  default: '',
})

export const NameState = atom<string>({
  key: 'nameState',
  default: '',
})

export const EmailState = atom<string>({
  key: 'emailState',
  default: '',
})

export const SignInTypeState = atom<SignInType | undefined>({
  key: 'SignInTypeState',
  default: undefined,
})
