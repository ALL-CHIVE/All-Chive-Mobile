import { client } from '@/apis/client'
import { ArchivingCategoryList } from '@/models/category/CategoryList'

/**
 * TODO: resoponse type 추가
 */
export const getCategoryList = async () => {
  const { data } = await client<ArchivingCategoryList>({
    method: 'get',
    url: `/categories/lists`,
  })

  return data
}
