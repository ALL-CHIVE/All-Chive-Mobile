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
 * PermissionFactory
 */
const PermissionFactory = (type: string) => {
  switch (type) {
    case Permissions.Camera:
      return getCameraPermissionKey()

    case Permissions.PhotoLibrary:
      return getPhotoLibraryPermissionKey()

    case Permissions.File:
      return getFilePermissionKey()

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

/**
 *
 */
const getFilePermissionKey = (): Permission | null => {
  return Platform.select({
    // ios: PERMISSIONS.IOS.,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    default: null,
  })
}
