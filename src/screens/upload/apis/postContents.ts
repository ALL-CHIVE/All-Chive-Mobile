import { client } from '@/apis/client'

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
  const response = await client({
    method: 'POST',
    url: '/contents',
    data: {
      contentType,
      archivingId,
      title,
      link,
      imgUrl,
      tagIds,
      memo,
    },
    // headers: token
  })

  return response
}
