import { GetContentsResponse } from '@/models/contents/Contents'

import { client } from '../client'

/**
 * 콘텐츠를 가져옵니다.
 */
export const getContent = async (contentId: number | undefined): Promise<GetContentsResponse> => {
  const data = await client({
    method: 'GET',
    url: `/contents/${contentId}`,
  })

  return data.data
}

/**
 * 컨텐츠를 삭제합니다.
 */
export const deleteContent = async (contentId: number) => {
  const response = await client({
    method: 'DELETE',
    url: `/contents/${contentId}`,
  })

  return response
}
