import { atom } from 'recoil'

export const IdTokenState = atom<string>({
  key: 'idTokenState',
  default: '',
})

export const ThirdpartyAccessTokenState = atom<string>({
  key: 'ThirdpartyAccessTokenState',
  default: '',
})
