import { client } from '@/apis/client'
import { ArchivingCategoryList } from '@/models/category/CategoryList'

interface GetCategoryListParams {
  topic: string
  page: number
  limit: number
}

/**
 *
 */
export const getCategoryList = async ({ topic, page, limit }: GetCategoryListParams) => {
  const { data } = await client<ArchivingCategoryList>({
    method: 'get',
    url: `/categories/me/archiving?topic=${topic}&page=${page}&limit=${limit}`,
  })

  return data
}
