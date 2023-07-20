import { client } from '@/apis/client'
import { HomeArchivingListResponse } from '@/models/archiving/HomeArchivingList'

interface GetArchivingListParams {
  category: string
  page: number
  limit: number
}

/**
 *
 */
export const getArchivingList = async ({ category, page, limit }: GetArchivingListParams) => {
  const { data } = await client<HomeArchivingListResponse>({
    method: 'get',
    url: `/categories/me/archiving?category=${category}&page=${page}&limit=${limit}`,
  })

  return data
}
