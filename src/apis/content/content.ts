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

interface DeleteContentParams {
  contentId: number
}

/**
 *
 */
export const deleteContent = async ({ contentId }: DeleteContentParams) => {
  const response = await client({
    method: 'DELETE',
    url: `/contents/${contentId}`,
  })

  return response
}
