import { atom } from 'recoil'

export interface SelectedArchiving {
  id: number
  title: string
}

export const SelectArchivingState = atom<SelectedArchiving>({
  key: 'selectArchivingState',
  default: { id: -1, title: '' },
})
