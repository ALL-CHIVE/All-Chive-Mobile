import { ContentByArchivingResponse } from '@/models/archiving/ContentByArchiving'

import { client } from '../client'

/**
 * 아카이빙별 컨텐츠 리스트를 가져옵니다.
 */
export const getContentByArchiving = async (
  archivingId: number,
  page: number,
  size: number,
  sort: Array<string>
): Promise<ContentByArchivingResponse> => {
  const data = await client({
    method: 'GET',
    url: `/archivings/${archivingId}/contents`,
    params: {
      page,
      size,
      sort,
    },
  })

  return data.data
}

/**
 * 아카이빙을 삭제합니다.
 */
export const deleteArchiving = async (archivingId: number) => {
  const response = await client({
    method: 'DELETE',
    url: `/archivings/${archivingId}`,
  })

  return response
}
