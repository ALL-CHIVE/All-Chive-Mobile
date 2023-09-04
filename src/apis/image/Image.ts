import { api } from '@/apis'
import { ImageUrl } from '@/models/ImageUrl'

/**
 * 프로필 이미지 업로드 url 요청할 수 있는 api
 */
export const getUserImageUrl = async (): Promise<ImageUrl> => {
  const { data } = await api.get(`/user/image`)
  return data.data
}

/**
 * 컨텐츠 이미지 업로드 url 요청할 수 있는 api
 */
export const getContentsImageUrl = async (): Promise<ImageUrl> => {
  const { data } = await api.get(`/contents/image`)
  return data.data
}

/**
 * 아카이빙 이미지 업로드 url 요청할 수 있는 api
 */
export const getArchivingImageUrl = async (): Promise<ImageUrl> => {
  const { data } = await api.get(`/archivings/image`)
  return data.data
}
