import { KeywordResponse, KeywordsResponse, SearchResponse } from '@/models/Search'
import { SearchType } from '@/models/enums/SearchType'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from '../Client'

/**
 * 검색어를 검색합니다.
 */
export const getSearch = async (
  type: SearchType,
  word: string,
  page?: number,
  size?: number,
  sort?: Array<string>
) => {
  const accessToken = await getAccessToken()
  const { data } = await client.get<SearchResponse>(`/searches`, {
    params: {
      type,
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

  return data.data.keyword
}

/**
 * 최근 검색어 목록을 가져옵니다. (5개)
 */
export const getSearchLatest = async () => {
  const accessToken = await getAccessToken()
  const { data } = await client.get<KeywordsResponse>(`/searches/latest`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 최근 검색어를 삭제합니다.
 */
export const deleteSearchLatest = async (ids: number[]) => {
  const accessToken = await getAccessToken()
  const response = await client.delete(`/searches/latest/`, {
    data: {
      ids,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
}
