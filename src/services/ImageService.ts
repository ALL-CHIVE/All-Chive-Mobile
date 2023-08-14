import axios from 'axios'
import { decode } from 'base64-arraybuffer'
import fs from 'react-native-fs'
import uuid from 'react-native-uuid'

import { getAwsImageUrl } from '@/apis/image'

/**
 * 프로필 이미지 URL을 생성합니다.
 */
export const uploadProfileImage = async (uri: string, key = '') => {
  key = key ? key : `user/${uuid.v4()}/profile.jpg`
  return uploadImage(uri, key)
}

/**
 * 컨텐츠 이미지 URL을 생성합니다.
 */
export const uploadContentImage = async (uri: string, key = '') => {
  key = key ? key : `contents/${uuid.v4()}/image.jpg`
  return uploadImage(uri, key)
}

/**
 * 아카이빙 이미지 URL을 생성합니다.
 */
export const uploadArchivingImage = async (uri: string, key = '') => {
  key = key ? key : `archivings/${uuid.v4()}/image.jpg`
  return uploadImage(uri, key)
}

/**
 * uploadImage
 */
const uploadImage = async (uri: string, key: string) => {
  const imageUrl = await getAwsImageUrl(key)

  if (imageUrl) {
    try {
      await uploadImageCore(imageUrl, uri)
      return key
    } catch (error) {
      // console.log('upload error', error)
    }
  }

  return ''
}

/**
 * uploadImageCore
 */
const uploadImageCore = async (uploadUrl: string, fileUrl: string) => {
  const imageBody = await getBinary(fileUrl)

  const response = await axios.put(uploadUrl, imageBody, {
    headers: {
      'Content-Type': `image/jpeg`,
      ACL: 'public-read',
    },
  })

  return response
}

/**
 * getBinary
 */
const getBinary = async (fileUri: string) => {
  const imageBody = await fs.readFile(fileUri, 'base64')
  return decode(imageBody)
}
