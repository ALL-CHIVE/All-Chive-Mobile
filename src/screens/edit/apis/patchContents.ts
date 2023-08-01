import { client } from '@/apis/client'
import { ContentType } from '@/models/enums/ContentType'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

interface PatchContentsParams {
  contentId: number
  contentType: ContentType
  archivingId: number
  title: string
  link?: string | ''
  imgUrl?: string | ''
  tagIds?: number[]
  memo?: string
}

/**
 * 컨텐츠를 수정합니다.
 */
export const patchContents = async ({
  contentId,
  contentType,
  archivingId,
  title,
  link,
  imgUrl,
  tagIds,
  memo,
}: PatchContentsParams) => {
  const accessToken = await getAccessToken()
  const response = await client.patch(
    `/contents/${contentId}`,
    {
      contentType,
      archivingId,
      title,
      link,
      imgUrl,
      tagIds,
      memo,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}
