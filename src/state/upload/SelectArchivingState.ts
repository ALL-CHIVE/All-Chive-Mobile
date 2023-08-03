import { atom } from 'recoil'

export const SelectArchivingState = atom<[number, string]>({
  key: 'selectArchivingState',
  default: [-1, ''],
})
