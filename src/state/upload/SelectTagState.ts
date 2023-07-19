import { atom } from 'recoil'

export const SelectTagState = atom<string[]>({ key: 'selectTagState', default: [] })
