import AsyncStorage from '@react-native-async-storage/async-storage'

import { LocalStorageKey } from './LocalStorageKey'

/**
 * 토큰을 초기화 합니다.
 */
export const clearTokens = () => {
  setRefreshToken('')
  setAccessToken('')
}

/**
 * saveTokens
 */
export const saveTokens = async (refreshToken: string, accessToken: string) => {
  await setRefreshToken(refreshToken)
  await setAccessToken(accessToken)
}

/**
 * refresh Token을 가져옵니다.
 */
export const getRefreshToken = async () => {
  return await getItemOrNull<string>(LocalStorageKey.RefreshToken)
}

/**
 * refresh Token을 갱신합니다.
 */
const setRefreshToken = async (value: string) => {
  await setItem(LocalStorageKey.RefreshToken, value)
}

/**
 * access Token을 가져옵니다.
 */
export const getAccessToken = async () => {
  return await getItemOrNull<string>(LocalStorageKey.AccessToken)
}

/**
 * access Token을 갱신합니다.
 */
const setAccessToken = async (value: string) => {
  await setItem(LocalStorageKey.AccessToken, value)
}

/**
 * 최초 실행 여부를 확인합니다.
 */
export const checkIsInstalled = async () => {
  return !!(await getItemOrNull<boolean>(LocalStorageKey.IsInstalled))
}

/**
 * 최초 실행 여부를 갱신합니다.
 */
export const setIsInstalled = async (value: boolean) => {
  await setItem(LocalStorageKey.IsInstalled, value)
}

/**
 * 스토리지에서 아이템을 가져옵니다.
 */
const getItemOrNull = async <T>(key: LocalStorageKey): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key)
    return data ? (JSON.parse(data) as T) : null
  } catch (error) {
    // TODO: log 파일에 저장
    return null
  }
}

/**
 * 스토리지에 아이템을 저장합니다.
 */
const setItem = async <T>(key: LocalStorageKey, items: T) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(items))
  } catch (error) {
    // TODO: log 파일에 저장
  }
}
