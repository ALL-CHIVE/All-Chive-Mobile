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
  const { data } = await client.post(
    `/searches?page=${page}?size=${size}?sort=${sort}?type=${type}`,
    {
      keyword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return data.data
}

/**
 * 검색어 자동 완성
 */
export const postSearchRelation = async (keyword: string) => {
  const accessToken = await getAccessToken()
  const { data } = await client.post(
    `/searches/relation`,
    {
      keyword,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return data.data
}

/**
 * 최근 검색어 목록을 가져옵니다. (5개)
 */
export const getSearchLatest = async () => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/searches/latest`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
