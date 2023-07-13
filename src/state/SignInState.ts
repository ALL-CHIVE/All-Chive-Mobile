import { atom } from 'recoil'

export const SignInState = atom<boolean>({
  key: 'signInState',
  default: false,
})
