//TODO: 이미지 업로드 구현

import axios from 'axios'
import { decode } from 'base64-arraybuffer'
import fs from 'react-native-fs'
import uuid from 'react-native-uuid'

import { assetClient, client } from '@/apis/client'
import { getUserImageUrl } from '@/apis/image'

/**
 * 프로필 사진 URL을 생성합니다.
 */
export const UploadProfileImage = async (uri: string, key = '') => {
  key = key ? key : `user/${uuid.v4()}/profile.jpg`
  const imageUrl = await getUserImageUrl(key)

  if (imageUrl) {
    try {
      await uploadImage(imageUrl, uri)
      return key
    } catch (error) {
      console.log('upload error', error)
    }
  }
}

/**
 * uploadImage
 */
const uploadImage = async (uploadUrl: string, fileUrl: string) => {
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
