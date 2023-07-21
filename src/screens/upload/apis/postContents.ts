import { client } from '@/apis/client'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

interface PostContentsParams {
  contentType: 'link' | 'image'
  archivingId: number
  title: string
  link?: string | ''
  imgUrl?: string | ''
  tagIds?: number[]
  memo?: string
}

/**
 *
 */
export const postContents = async ({
  contentType,
  archivingId,
  title,
  link,
  imgUrl,
  tagIds,
  memo,
}: PostContentsParams) => {
  const accessToken = await getAccessToken()
  const response = await client.post('/contents', {
    data: {
      contentType,
      archivingId,
      title,
      link,
      imgUrl,
      tagIds,
      memo,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
