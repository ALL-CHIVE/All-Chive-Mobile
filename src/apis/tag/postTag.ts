import { client } from '../client'

interface PostTagParams {
  name: string
}

/**
 *
 */
export const postTag = async ({ name }: PostTagParams) => {
  const response = await client({
    method: 'POST',
    url: '/tags',
    data: {
      name,
    },
    // headers: token
  })

  return response
}
