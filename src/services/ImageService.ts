import RNBlobUtil from 'react-native-blob-util'
import Config from 'react-native-config'

import { getArchivingImageUrl, getContentsImageUrl, getUserImageUrl } from '@/apis/image/Image'

/**
 * 프로필 이미지 URL을 생성합니다.
 */
export const uploadProfileImage = async (imageUri: string) => {
  if (isUploadedImage(imageUri)) {
    return imageUri
  }

  const { url } = await getUserImageUrl()
  await uploadImageToS3(url, imageUri)
  return url
}

/**
 * 컨텐츠 이미지 URL을 생성합니다.
 */
export const uploadContentImage = async (imageUri: string) => {
  if (isUploadedImage(imageUri)) {
    return imageUri
  }

  const { url } = await getContentsImageUrl()
  await uploadImageToS3(url, imageUri)
  return url
}

/**
 * 아카이빙 이미지 URL을 생성합니다.
 */
export const uploadArchivingImage = async (imageUri: string) => {
  if (isUploadedImage(imageUri)) {
    return imageUri
  }

  const { url } = await getArchivingImageUrl()
  await uploadImageToS3(url, imageUri)
  return url
}

/**
 * 이미 업로드 된 이미지인지 확인합니다.
 */
const isUploadedImage = (imageUri: string) => {
  return Config.ALLCHIVE_ASSET_SERVER && imageUri.startsWith(Config.ALLCHIVE_ASSET_SERVER)
}

/**
 * 생성된 presigned url로 이미지를 전송합니다.
 */
const uploadImageToS3 = async (url: string, imageUri: string) => {
  await RNBlobUtil.fetch(
    'PUT',
    url,
    {
      'Content-Type': 'image/jpeg',
    },
    RNBlobUtil.wrap(imageUri)
  )
}
