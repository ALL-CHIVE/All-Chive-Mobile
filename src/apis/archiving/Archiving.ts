import { api } from '@/apis'
import { ArchivingInfo } from '@/models/Archiving'

/**
 * 아카이빙 정보 수정시 보여줄 정보를 가져옵니다.
 */
export const getArchivingData = async (archivingId: number): Promise<ArchivingInfo> => {
  const { data } = await api.get(`/archivings/${archivingId}`)
  return data.data
}

/**
 * 아카이빙을 생성합니다.
 */
export const postArchiving = async (
  title: string,
  imageUrl: string,
  category: string,
  publicStatus: boolean
) => {
  const response = await api.post('/archivings', {
    title,
    imageUrl,
    category,
    publicStatus,
  })

  return response
}

/**
 * 아카이빙을 수정합니다.
 */
export const patchArchiving = async (
  archivingId: number,
  title: string,
  imageUrl: string,
  category: string,
  publicStatus: boolean
) => {
  const response = await api.patch(`/archivings/${archivingId}`, {
    title,
    imageUrl,
    category,
    publicStatus,
  })

  return response
}

/**
 * 아카이빙을 스크랩합니다.
 */
export const patchScrapArchiving = async (cancel: boolean, archivingId: number) => {
  const response = await api.patch(`/archivings/${archivingId}/scrap`, null, {
    params: {
      cancel,
    },
  })

  return response
}

/**
 * 아카이빙을 고정합니다.
 */
export const patchPinArchiving = async (cancel: boolean, archivingId: number) => {
  const response = await api.patch(`/archivings/${archivingId}/pin`, null, {
    params: {
      cancel,
    },
  })

  return response
}

/**
 * 아카이빙을 삭제합니다.
 */
export const deleteArchiving = async (archivingId: number) => {
  const response = await api.delete(`/archivings/${archivingId}`)

  return response
}
