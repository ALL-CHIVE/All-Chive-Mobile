import { client } from '@/apis/client'
import { ArchivingListResponse } from '@/models/archiving/ArchivingList'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

/**
 * 사용 중인 주제 & 아카이빙 리스트를 가져옵니다. (컨텐츠 추가 시 사용)
 */
export const getArchivingList = async (): Promise<ArchivingListResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get('/archivings/lists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
