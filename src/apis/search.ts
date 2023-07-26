import { KeywordResponse, SearchResponse } from '@/models/Search'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

/**
 * 검색어를 검색합니다.
 */
export const getSearch = async (
  type: 'ALL' | 'MY' | 'COMMUNITY',
  word: string,
  page?: number,
  size?: number,
  sort?: Array<string>
) => {
  const accessToken = await getAccessToken()
  const { data } = await client.get<SearchResponse>(`/searches?type=${type}`, {
    params: {
      page,
      size,
      sort,
      word,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 검색어 자동 완성
 */
export const getSearchRelation = async (word: string) => {
  const accessToken = await getAccessToken()
  const { data } = await client.get<KeywordResponse>(`/searches/relation`, {
    params: {
      word,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 최근 검색어 목록을 가져옵니다. (5개)
 */
export const getSearchLatest = async () => {
  const accessToken = await getAccessToken()
  const { data } = await client.get<KeywordResponse>(`/searches/latest`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 최근 검색어를 삭제합니다.
 */
export const deleteSearchLatest = async (latestId: number) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/searches/latest/${latestId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
