import { GetTagResponse } from '@/models/tag/Tag'

import { client } from '../client'

/**
 * 모든 태그를 가져옵니다. (latest = true면 최근 사용한 태그를 가져옵니다.)
 */
export const getTag = async (latest: boolean) => {
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

/**
 * 태그를 추가합니다.
 */
export const postTag = async (name: string) => {
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

/**
 * 태그를 삭제합니다.
 */
export const deleteTag = async (tagId: number) => {
  const response = await client({
    method: 'DELETE',
    url: `/tags/${tagId}`,
    // headers: token
  })

  return response
}

/**
 * 태그를 수정합니다.
 */
export const patchTag = async (tagId: number, name: string) => {
  const response = await client({
    method: 'PATCH',
    url: `/tags/${tagId}`,
    data: {
      name,
    },
    // headers: token
  })

  return response
}
