import { atom } from 'recoil'

import { Category, GetAllCategory, GetCategory } from '@/models/enums/Category'

export const CategoryListState = atom<Category[]>({
  key: 'categoryListState',
  default: GetCategory(),
})

export const AllCategoryListState = atom<Category[]>({
  key: 'allCategoryListState',
  default: GetAllCategory(),
})
