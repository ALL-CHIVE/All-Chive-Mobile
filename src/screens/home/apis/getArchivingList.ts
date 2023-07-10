import { client } from '@/apis/client'
import { HomeArchivingList } from '@/models/archiving/ArchivingList'

interface GetArchivingListParams {
  category: string
  page: number
  limit: number
}

/**
 *
 */
export const getArchivingList = async ({ category, page, limit }: GetArchivingListParams) => {
  const { data } = await client<HomeArchivingList>({
    method: 'get',
    url: `/categories/me/archiving?category=${category}&page=${page}&limit=${limit}`,
  })

  return data
}
