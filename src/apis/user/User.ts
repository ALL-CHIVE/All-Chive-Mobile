import { api } from '@/apis'
import { UserInfoResponse, UserResponse } from '@/models/User'
import { getAccessToken } from '@/services/localStorage/LocalStorage'

/**
 * 닉네임 중복체크합니다.
 */
export const checkNicknameValid = (nickname: string) => {
  return api.post(`/user/nickname`, { nickname })
}

/**
 * 내 정보를 가져옵니다.
 */
export const getUserInfo = async (): Promise<UserInfoResponse> => {
  const accessToken = await getAccessToken()
  const { data } = await api.get(`/user/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}

/**
 * 내 정보를 수정합니다.
 */
export const postUserInfo = async (
  imgUrl: string,
  email: string,
  name: string,
  nickname: string
) => {
  const accessToken = await getAccessToken()
  const response = await api.post(
    `/user/info`,
    {
      imgUrl,
      email,
      name,
      nickname,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response
}

/**
 * 아카이빙 현황과 내 프로필을 가져옵니다.
 */
export const getUser = async (): Promise<UserResponse> => {
  const accessToken = await getAccessToken()

  const { data } = await api.get(`/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data.data
}
