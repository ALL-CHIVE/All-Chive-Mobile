import { atom } from 'recoil'

export const TokenState = atom<string>({
  key: 'tokenState',
  default: '',
})

export const IdTokenState = atom<string>({
  key: 'idTokenState',
  default: '',
})
