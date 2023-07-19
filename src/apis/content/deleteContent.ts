import { client } from '../client'

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
