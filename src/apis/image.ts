import { Credentials } from 'aws-sdk'
import S3 from 'aws-sdk/clients/s3'
import Config from 'react-native-config'

import { ImageUrl } from '@/models/ImageUrl'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

import { client } from './client'

const access = new Credentials({
  accessKeyId: Config.AWS_ASSET_SERVER_STAGE_ID ?? '',
  secretAccessKey: Config.AWS_ASSET_SERVER_STAGE_KEY ?? '',
})

const s3 = new S3({
  credentials: access,
  region: Config.AWS_REGION ?? '',
  signatureVersion: 'v4',
})

/**
 * 프로필 이미지 업로드 url 요청할 수 있는 api
 */
export const getUserImageUrl = async (key: string): Promise<string> => {
  const url = await s3.getSignedUrlPromise('putObject', {
    Bucket: Config.AWS_ASSET_BUCKET_STAGE,
    Key: key,
    ContentType: 'image/jpeg',
    Expires: 60 * 15,
    ACL: 'public-read',
  })

  return url
}

// /**
//  * 프로필 이미지 업로드 url 요청할 수 있는 api
//  */
// export const getUserImageUrl = async (): Promise<ImageUrl> => {
//   const accessToken = await getAccessToken()
//   const { data } = await client.get(`/user/image`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })

//   return data.data
// }

/**
 * 컨텐츠 이미지 업로드 url 요청할 수 있는 api
 */
export const getContentsImageUrl = async (): Promise<ImageUrl> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/contents/image`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 아카이빙 이미지 업로드 url 요청할 수 있는 api
 */
export const getArchivingImageUrl = async (): Promise<ImageUrl> => {
  const accessToken = await getAccessToken()
  const { data } = await client.get(`/archivings/image`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
