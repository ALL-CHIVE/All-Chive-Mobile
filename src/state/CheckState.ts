import { atom } from 'recoil'

import { DeleteRecyclesRequest } from '@/models/Recycle'

export const CheckArchivingState = atom<number[]>({
  key: 'checkArchivingState',
  default: [],
})

export const CheckContentState = atom<number[]>({
  key: 'checkContentState',
  default: [],
})

export const CheckState = atom<DeleteRecyclesRequest>({
  key: 'checkState',
  default: {
    archivingIds: [],
    contentIds: [],
  },
})
