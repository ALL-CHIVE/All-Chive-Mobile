import { atom } from 'recoil'

export const CategoryState = atom<string>({ key: 'categoryState', default: 'ALL' })

export const CommunityCategoryState = atom<string>({
  key: 'communityCategoryState',
  default: 'ALL',
})
