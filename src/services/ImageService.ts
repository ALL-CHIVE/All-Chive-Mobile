import axios from 'axios'
import { decode } from 'base64-arraybuffer'
import fs from 'react-native-fs'

import { getAccessToken } from './localStorage/LocalStorage'

/**
 * 생성된 presigned url로 이미지를 전송합니다.
 */
export const uploadImageToS3 = async (url: string, file: string) => {
  const accessToken = await getAccessToken()
  try {
    const response = await axios.put(url, {
      body: getBinary(file),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'image/jpeg',
      },
    })

    return response
  } catch (error) {
    // console.log(error)
  }
}

/**
 * getBinary
 */
const getBinary = async (fileUri: string) => {
  const imageBody = await fs.readFile(fileUri, 'base64')
  return decode(imageBody)
}
