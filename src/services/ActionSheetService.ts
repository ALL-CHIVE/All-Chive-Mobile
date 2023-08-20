import { Linking, Platform } from 'react-native'

import { DefaultMenuType, ImageUploadMenuType } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'

import { createCancelConfirmAlert } from './Alert'
import { checkAndRequestPermission } from './PermissionService'
import { handleCameraOpen, handleFileOpen, handleImageSelect } from './imagePicker'

/**
 * 기본 이미지 메뉴를 핸들링합니다.
 */
export const handleDefaultImageMenu = async (index: DefaultMenuType) => {
  switch (index) {
    case DefaultMenuType.selectDefaultImage: {
      return 'default'
    }
    case DefaultMenuType.selectFromPhotoLibrary: {
      const permission = await checkAndRequestPermission(Permissions.PhotoLibrary)

      if (permission === 'blocked' || permission === 'denied') {
        createCancelConfirmAlert(
          'pleaseAllowPhotoPermission',
          Platform.select({
            ios: 'photoPermissionGuideIOS',
            android: 'photoPermissionGuideAndroid',
            default: '',
          }),
          () => Linking.openSettings()
        )

        return
      }

      const selectedImage = await handleImageSelect()
      return selectedImage?.assets ? selectedImage.assets[0].uri : ''
    }
    case DefaultMenuType.selectFromCamera: {
      const permission = await checkAndRequestPermission(Permissions.Camera)

      if (permission === 'blocked' || permission === 'denied') {
        createCancelConfirmAlert(
          'pleaseAllowCameraPermission',
          Platform.select({
            ios: 'cameraPermissionGuideIOS',
            android: 'cameraPermissionGuideAndroid',
            default: '',
          }),
          () => Linking.openSettings()
        )

        return
      }

      const selectedImage = await handleCameraOpen()
      return selectedImage?.assets ? selectedImage.assets[0].uri : ''
    }
  }
}

/**
 * 이미지 업로드 메뉴를 핸들링합니다.
 */
export const handleImageUploadMenu = async (index: ImageUploadMenuType) => {
  switch (index) {
    case ImageUploadMenuType.selectFromPhotoLibrary: {
      const permission = await checkAndRequestPermission(Permissions.PhotoLibrary)

      if (permission === 'blocked' || permission === 'denied') {
        createCancelConfirmAlert(
          'pleaseAllowPhotoPermission',
          Platform.select({
            ios: 'photoPermissionGuideIOS',
            android: 'photoPermissionGuideAndroid',
            default: '',
          }),
          () => Linking.openSettings()
        )

        return
      }

      const selectedImage = await handleImageSelect()
      return selectedImage?.assets ? selectedImage.assets[0].uri : ''
    }
    // case ImageUploadMenuType.selectFromFile: {
    //   const permission = await checkAndRequestPermission(Permissions.File)

    //   if (permission === 'blocked' || permission === 'denied') {
    //     createCancelConfirmAlert(
    //       'pleaseAllowFilePermission',
    //       Platform.select({
    //         ios: 'filePermissionGuideIOS',
    //         android: 'filePermissionGuideAndroid',
    //         default: '',
    //       }),
    //       () => Linking.openSettings()
    //     )

    //     return
    //   }

    //   const selectedImage = await handleFileOpen()
    //   return selectedImage?.toString()
    // }
    case ImageUploadMenuType.selectFromCamera: {
      const permission = await checkAndRequestPermission(Permissions.Camera)

      if (permission === 'blocked' || permission === 'denied') {
        createCancelConfirmAlert(
          'pleaseAllowCameraPermission',
          Platform.select({
            ios: 'cameraPermissionGuideIOS',
            android: 'cameraPermissionGuideAndroid',
            default: '',
          }),
          () => Linking.openSettings()
        )

        return
      }

      const selectedImage = await handleCameraOpen()
      return selectedImage?.assets ? selectedImage.assets[0].uri : ''
    }
  }
}
