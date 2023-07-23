import { atom } from 'recoil'

export const CategoryState = atom<string>({ key: 'categoryState', default: 'ALL' })
