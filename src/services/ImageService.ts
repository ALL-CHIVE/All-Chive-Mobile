import RNBlobUtil from 'react-native-blob-util'

import { getArchivingImageUrl, getContentsImageUrl, getUserImageUrl } from '@/apis/recycle/Image'

/**
 * 프로필 이미지 URL을 생성합니다.
 */
export const uploadProfileImage = async (imageUri: string) => {
  try {
    const { url } = await getUserImageUrl()
    await uploadImageToS3(url, imageUri)
    return url
  } catch (error) {
    return ''
  }
}

/**
 * 컨텐츠 이미지 URL을 생성합니다.
 */
export const uploadContentImage = async (imageUri: string) => {
  try {
    const { url } = await getContentsImageUrl()
    await uploadImageToS3(url, imageUri)
    return url
  } catch (error) {
    return ''
  }
}

/**
 * 아카이빙 이미지 URL을 생성합니다.
 */
export const uploadArchivingImage = async (imageUri: string) => {
  try {
    const { url } = await getArchivingImageUrl()
    await uploadImageToS3(url, imageUri)
    return url
  } catch (error) {
    return ''
  }
}

/**
 * 생성된 presigned url로 이미지를 전송합니다.
 */
const uploadImageToS3 = async (url: string, imageUri: string) => {
  try {
    await RNBlobUtil.fetch(
      'PUT',
      url,
      {
        'Content-Type': 'image/jpeg',
      },
      RNBlobUtil.wrap(imageUri)
    )

    return true
  } catch (error) {
    // console.log(error)
    return false
  }
}
