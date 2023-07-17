import { GetTagResponse } from '@/models/tag/Tag'

import { client } from '../client'

interface GetTagParams {
  latest: boolean
}

/**
 *
 */
export const getTag = async ({ latest }: GetTagParams) => {
  const { data } = await client<GetTagResponse>({
    method: 'GET',
    url: '/tags',
    data: {
      latest,
    },
    // headers: token
  })

  return data
}
