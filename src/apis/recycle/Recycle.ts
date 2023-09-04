import { api } from '@/apis'
import { DeleteRecyclesRequest, RecyclesResponse } from '@/models/Recycle'

/**
 * 삭제된 아카이빙, 컨텐츠를 가져옵니다.
 */
export const getRecycles = async (): Promise<RecyclesResponse> => {
  const { data } = await api.get(`/recycles`)
  return data.data
}

/**
 * 삭제된 아카이빙, 컨텐츠를 영구적으로 삭제합니다.
 */
export const deleteRecycles = async ({ archivingIds, contentIds }: DeleteRecyclesRequest) => {
  const response = await api.delete(`/recycles`, {
    data: {
      archivingIds,
      contentIds,
    },
  })

  return response
}

/**
 * 삭제된 아카이빙, 컨텐츠를 복구합니다.
 */
export const patchRecycles = async ({ archivingIds, contentIds }: DeleteRecyclesRequest) => {
  const response = await api.patch(`/recycles`, {
    archivingIds,
    contentIds,
  })

  return response
}
