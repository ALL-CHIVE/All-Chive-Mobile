import { api } from '@/apis'
import { GetContentsInfoResponse, GetContentsResponse } from '@/models/Contents'
import { ContentType } from '@/models/enums/ContentType'

/**
 * 컨텐츠를 생성합니다.
 */
export const postContents = async (
  contentType: ContentType,
  archivingId: number,
  title: string,
  link: string,
  imgUrl: string,
  tagIds: number[],
  memo: string
): Promise<GetContentsResponse> => {
  const { data } = await api.post('/contents', {
    contentType,
    archivingId,
    title,
    link,
    imgUrl,
    tagIds,
    memo,
  })

  return data.data
}

/**
 * 컨텐츠 내용을 가져옵니다.
 */
export const getContents = async (contentId: number): Promise<GetContentsResponse> => {
  const { data } = await api.get(`/contents/${contentId}`)
  return data.data
}

/**
 * 컨텐츠를 수정합니다.
 */
export const patchContents = async (
  contentId: number,
  contentType: ContentType,
  archivingId: number,
  title: string,
  link: string,
  imgUrl: string,
  tagIds: number[],
  memo: string
) => {
  const response = await api.patch(`/contents/${contentId}`, {
    contentType,
    archivingId,
    title,
    link,
    imgUrl,
    tagIds,
    memo,
  })

  return response
}

/**
 * 컨텐츠를 삭제합니다.
 */
export const deleteContents = async (contentId: number) => {
  const response = await api.delete(`/contents/${contentId}`)
  return response
}

/**
 * 컨텐츠 정보 수정시 보여줄 정보를 가져옵니다.
 */
export const getContentsInfo = async (contentId: number): Promise<GetContentsInfoResponse> => {
  const { data } = await api.get(`/contents/${contentId}/info`)
  return data.data
}
