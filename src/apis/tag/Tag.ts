import { api } from '@/apis'
import { GetTagResponse } from '@/models/Tag'

/**
 * 모든 태그를 가져옵니다. (latest = true면 최근 사용한 태그를 가져옵니다.)
 */
export const getTag = async (latest: boolean) => {
  const { data } = await api.get<GetTagResponse>('/tags', {
    params: {
      latest,
    },
  })

  return data.data.tags
}

/**
 * 태그를 추가합니다.
 */
export const postTag = async (name: string) => {
  const { data } = await api.post('/tags', {
    name,
  })

  return data.data
}

/**
 * 태그를 삭제합니다.
 */
export const deleteTag = async (tagId: number) => {
  const response = await api.delete(`/tags/${tagId}`)
  return response
}

/**
 * 태그를 수정합니다.
 */
export const patchTag = async (tagId: number, name: string) => {
  const response = await api.patch(`/tags/${tagId}`, {
    name,
  })

  return response
}
