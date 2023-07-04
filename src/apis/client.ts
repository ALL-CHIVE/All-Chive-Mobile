import axios from 'axios'

const BASE_URL = ''

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})
