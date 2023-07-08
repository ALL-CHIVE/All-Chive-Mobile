import { client } from '@/apis/client'
import { ArchivingCategoryList } from '@/models/category/CategoryList'

interface GetCategoryListParams {
  subject: string
  page: number
  limit: number
}

/**
 *
 */
export const getCategoryList = async ({ subject, page, limit }: GetCategoryListParams) => {
  const { data } = await client<ArchivingCategoryList>({
    method: 'get',
    url: `/categories/me/archiving?subject=${subject}&page=${page}&limit=${limit}`,
  })

  return data
}
