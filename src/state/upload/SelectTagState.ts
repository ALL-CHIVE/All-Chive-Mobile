import { atom } from 'recoil'

import { Tag } from '@/models/Tag'

export const SelectTagState = atom<Tag[]>({ key: 'selectTagState', default: [] })
