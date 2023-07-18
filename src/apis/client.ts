import axios from 'axios'

const BASE_URL = ''

export const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json',
  },
})

/**
 * postIdTokenLogin
 */
export const postIdTokenLogin = (type: string, idToken: string) => {
  return client.post(`/auth/oauth/login/${type}/idtoken?idToken=${idToken}`)
}
