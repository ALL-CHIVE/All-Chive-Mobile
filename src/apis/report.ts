import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

/**
 *
 */
export const postReport = async (
  type: 'CONTENT' | 'ARCHIVING',
  reason: string,
  reportedType: string,
  id: number
) => {
  const accessToken = await getAccessToken()
  const response = await client.post(
    `/reports?type=${type}`,
    {
      reason,
      reportedType,
      id,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}
