import { atom } from 'recoil'

import { GetAllCategory, GetCategory } from '@/models/enums/Category'

export const CategoryListState = atom<string[]>({
  key: 'categoryListState',
  default: GetCategory(),
})

export const AllCategoryListState = atom<string[]>({
  key: 'allCategoryListState',
  default: GetAllCategory(),
})
