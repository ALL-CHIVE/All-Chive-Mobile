import axios from 'axios'
import Config from 'react-native-config'

import { getAccessToken } from '@/services/localStorage/LocalStorage'

const BASE_URL = Config.ALLCHIVE_SERVER

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
