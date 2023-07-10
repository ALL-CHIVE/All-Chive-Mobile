import { GetAll } from '@/extensions/enumExtensions'

export enum Category {
  All = 'all',
  Food = 'food',
  Life = 'life',
  HomeAndLiving = 'homeAndLiving',
  Shopping = 'shopping',
  Sports = 'sports',
  SelfDevelopment = 'selfDevelopment',
  Tech = 'tech',
  Design = 'design',
  Trends = 'trends',
  Etc = 'etc',
}

/**
 * 전체와 기타를 제외한 주제를 가져옵니다.
 */
export const GetCategory = () =>
  GetAll(Category).filter((category) => category !== Category.All && category !== Category.Etc)

/**
 * 전체와 기타 포함 모든 주제를 가져옵니다.
 */
export const GetAllCategory = () => GetAll(Category)
