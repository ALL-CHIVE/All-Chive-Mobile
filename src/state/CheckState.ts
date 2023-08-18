import { atom } from 'recoil'

export const CheckArchivingState = atom<number[]>({
  key: 'checkArchivingState',
  default: [],
})

export const CheckContentState = atom<number[]>({
  key: 'checkContentState',
  default: [],
})
