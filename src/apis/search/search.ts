import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../client'

/**
 * 검색어를 검색합니다.
 */
export const postSearch = async (
  type: 'ALL' | 'MY' | 'COMMUNITY',
  keyword: string,
  page?: number,
  size?: number,
  sort?: Array<string>
) => {
  const accessToken = await getAccessToken()
  const response = await client.post(`/searches`, {
    data: {
      page,
      size,
      sort,
      type,
      keyword,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 검색어 자동 완성
 */
export const postSearchRelation = async (keyword: string) => {
  const accessToken = await getAccessToken()
  const response = await client.post(`/searches/relation`, {
    data: {
      keyword,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}

/**
 * 최근 검색어 목록을 가져옵니다. (5개)
 */
export const getSearchLatest = async () => {
  const accessToken = await getAccessToken()
  const response = await client.get(`/searches/latest`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
