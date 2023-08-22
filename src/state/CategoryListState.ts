import { atom } from 'recoil'

import { Category, GetAllCategory, GetCategory, GetCategoryWithEtc } from '@/models/enums/Category'

export const CategoryListState = atom<Category[]>({
  key: 'categoryListState',
  default: GetCategory(),
})

export const CategoryListWithEtcState = atom<Category[]>({
  key: 'categoryListWithEtcState',
  default: GetCategoryWithEtc(),
})

export const AllCategoryListState = atom<Category[]>({
  key: 'allCategoryListState',
  default: GetAllCategory(),
})
