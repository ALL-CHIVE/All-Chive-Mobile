import axios, { AxiosError, AxiosResponse } from 'axios'
import Config from 'react-native-config'

import { ErrorData } from '@/models/Error'
import { AutoSignInResponse } from '@/models/user/Auth'
import { getAccessToken, getRefreshToken, saveTokens } from '@/services/localStorage/LocalStorage'

const BASE_URL = Config.ALLCHIVE_SERVER

export const apiWithoutToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    //TODO: 공통 Error 처리
    return Promise.reject(error)
  }
)

/**
 * onFulfilled
 */
const onFulfilled = (res: AxiosResponse) => res

let lock = false
/**
 * onRejected
 */
const onRejected = async (error: AxiosError) => {
  const originalConfig = error.config
  const data = error.response?.data as ErrorData

  if (originalConfig && error.response?.status === 401 && data?.code == 'AUTH_401_3' && !lock) {
    lock = true
    try {
      await updateTokens()
      return apiWithoutToken
        .request({
          ...originalConfig,
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        })
        .finally(() => (lock = false))
    } catch (error) {
      //ignore
    }
  }

  return Promise.reject(error)
}

api.interceptors.response.use(onFulfilled, onRejected)

/**
 * 토큰을 갱신합니다.
 */
export const updateTokens = async () => {
  try {
    const refreshToken = await getRefreshToken()
    const { data } = await apiWithoutToken.post(`/auth/token/refresh`, null, {
      params: {
        refreshToken,
      },
    })

    const tokens = data.data as AutoSignInResponse
    await saveTokens(tokens.refreshToken, tokens.accessToken)

    return true
  } catch (error) {
    return false
  }
}
