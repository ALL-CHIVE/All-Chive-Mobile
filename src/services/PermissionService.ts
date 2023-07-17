import { Platform } from 'react-native'
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  check,
  request,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions'

import { Permissions } from '@/models/enums/Permissions'

/**
 *
 */
export const requestPermissions = async () => {
  try {
    const permissions = Object.values(Permissions)

    const permissionKeys = permissions.map((p) => PermissionFactory(p)) as Permission[]

    const checkResults = await checkMultiple(permissionKeys)

    const requestKeys = permissionKeys.filter((p) => checkResults[p] === RESULTS.DENIED)

    await requestMultiple(requestKeys)
  } catch (error) {
    console.error(error)
  }
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
