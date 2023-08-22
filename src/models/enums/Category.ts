import { GetAll } from '@/extensions/enumExtensions'

export enum Category {
  All = 'ALL',
  Food = 'FOOD',
  Life = 'LIFE',
  HomeLiving = 'HOME_LIVING',
  Shopping = 'SHOPPING',
  Sport = 'SPORT',
  SelfImprovement = 'SELF_IMPROVEMENT',
  Tech = 'TECH',
  Design = 'DESIGN',
  Trend = 'TREND',
  Etc = 'ETC',
}

/**
 * 전체와 기타를 제외한 주제를 가져옵니다.
 */
export const GetCategory = () =>
  GetAll(Category).filter(
    (category) => category !== Category.All && category !== Category.Etc
  ) as Category[]

/**
 * 전체를 제외한 주제를 가져옵니다.
 */
export const GetCategoryWithEtc = () =>
  GetAll(Category).filter((category) => category !== Category.All) as Category[]

/**
 * 전체와 기타 포함 모든 주제를 가져옵니다.
 */
export const GetAllCategory = () => GetAll(Category) as Category[]
