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

interface PatchArchivingParams {
  archivingId: number
  title: string
  imageUrl: string
  category: string
  publicStatus: boolean
}

/**
 * 아카이빙을 수정합니다.
 */
export const patchArchiving = async ({
  archivingId,
  title,
  imageUrl,
  category,
  publicStatus,
}: PatchArchivingParams) => {
  const response = await client({
    method: 'PATCH',
    url: `/archivings/${archivingId}`,
    data: {
      title,
      imageUrl,
      category,
      publicStatus,
    },
  })

  return response
}
