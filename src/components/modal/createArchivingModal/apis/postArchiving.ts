import { client } from '@/apis/client'

interface PostArchivingParams {
  title: string
  imageUrl: string
  category: string
  publicStatus: boolean
}

/**
 * 아카이빙을 생성합니다.
 */
export const postArchiving = async ({
  title,
  imageUrl,
  category,
  publicStatus,
}: PostArchivingParams) => {
  const response = await client({
    method: 'POST',
    url: '/archivings',
    data: {
      title,
      imageUrl,
      category,
      publicStatus,
    },
  })

  return response
}
