import { api } from '@/apis'
import { KeywordResponse, KeywordsResponse, SearchResponse } from '@/models/Search'
import { SearchType } from '@/models/enums/SearchType'

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
  const { data } = await api.get<SearchResponse>(`/searches`, {
    params: {
      type,
      page,
      size,
      sort,
      word,
    },
  })

  return data.data
}

/**
 * 검색어 자동 완성
 */
export const getSearchRelation = async (word: string) => {
  const { data } = await api.get<KeywordResponse>(`/searches/relation`, {
    params: {
      word,
    },
  })

  return data.data.keyword
}

/**
 * 최근 검색어 목록을 가져옵니다. (5개)
 */
export const getSearchLatest = async () => {
  const { data } = await api.get<KeywordsResponse>(`/searches/latest`)
  return data.data
}

/**
 * 최근 검색어를 삭제합니다.
 */
export const deleteSearchLatest = async (ids: number[]) => {
  const response = await api.delete(`/searches/latest/`, {
    data: {
      ids,
    },
  })

  return response
}
