import AsyncStorage from '@react-native-async-storage/async-storage'

import { LocalStorageKey } from './LocalStorageKey'

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
    return (await AsyncStorage.getItem(key)) as T
  } catch (error) {
    // TODO: log 파일에 저장
    console.error('AsyncStorage error:', error)
    return null
  }
}

/**
 * 스토리지에 아이템을 저장합니다.
 */
const setItem = async <T>(key: LocalStorageKey, item: T) => {
  try {
    await AsyncStorage.setItem(key, item as string)
  } catch (error) {
    // TODO: log 파일에 저장
    console.error('AsyncStorage error:', error)
  }
}
