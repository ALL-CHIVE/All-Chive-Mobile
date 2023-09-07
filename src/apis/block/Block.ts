import { api } from '@/apis'
import { BlockListResponse, BlockResponse } from '@/models/Block'

/**
 * 차단한 유저 정보를 가져옵니다.
 */
export const getBlockList = async (): Promise<BlockListResponse> => {
  const { data } = await api.get(`/blocks`)
  return data.data
}

/**
 * 유저를 차단합니다.
 */
export const postBlock = async (userId: number): Promise<BlockResponse> => {
  const { data } = await api.post(`/blocks`, {
    userId,
  })

  return data.data
}

/**
 * 유저 차단을 해제합니다.
 */
export const deleteBlock = async (userId: number): Promise<BlockResponse> => {
  const { data } = await api.delete(`/blocks`, {
    data: {
      userId,
    },
  })

  return data.data
}
