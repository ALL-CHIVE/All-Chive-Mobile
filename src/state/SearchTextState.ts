import { atom } from 'recoil'

export const SearchTextState = atom<string>({
  key: 'searchTextState',
  default: '',
})
