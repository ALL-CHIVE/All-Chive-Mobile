import { atom } from 'recoil'

export const IdTokenState = atom<string>({
  key: 'idTokenState',
  default: '',
})
