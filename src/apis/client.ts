import axios from 'axios'
import Config from 'react-native-config'

const BASE_URL = Config.ALLCHIVE_STAGE_SERVER

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})
