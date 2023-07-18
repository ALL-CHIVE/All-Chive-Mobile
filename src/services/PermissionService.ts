import { Platform } from 'react-native'
import { PERMISSIONS, Permission, RESULTS, check, request } from 'react-native-permissions'

import { Permissions } from '@/models/enums/Permissions'

/**
 * checkAndRequestPermission
 */
export const checkAndRequestPermission = async (type: Permissions) => {
  const key = PermissionFactory(type)

  if (!key) {
    return 'denied'
  }

  const checkResult = await check(key)

  if (checkResult === RESULTS.DENIED) {
    return await request(key)
  }

  return checkResult
}

/**
 * checkPermission
 */
export const checkPermission = async (type: Permissions) => {
  const key = PermissionFactory(type)
  return key && (await check(key))
}

/**
 * requestPermission
 */
export const requestPermission = async (type: Permissions) => {
  const key = PermissionFactory(type)
  return key && (await request(key))
}

/**
 * PermissionFactory
 */
const PermissionFactory = (type: string) => {
  switch (type) {
    case Permissions.Camera:
      return getCameraPermissionKey()

    case Permissions.PhotoLibrary:
      return getPhotoLibraryPermissionKey()

    default:
      return null
  }
}

/**
 * getCameraPermissionKey
 */
const getCameraPermissionKey = (): Permission | null => {
  return Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
    default: null,
  })
}

/**
 * getPhotoLibraryPermissionKey
 */
const getPhotoLibraryPermissionKey = (): Permission | null => {
  return Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    default: null,
  })
}
