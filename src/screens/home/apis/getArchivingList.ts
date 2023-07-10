import { client } from '@/apis/client'
import { HomeArchivingList } from '@/models/archiving/ArchivingList'

interface GetArchivingListParams {
  subject: string
  page: number
  limit: number
}

/**
 *
 */
export const getArchivingList = async ({ subject, page, limit }: GetArchivingListParams) => {
  const { data } = await client<HomeArchivingList>({
    method: 'get',
    url: `/categories/me/archiving?subject=${subject}&page=${page}&limit=${limit}`,
  })

  return data
}
