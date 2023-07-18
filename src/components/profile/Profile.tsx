import React, { useRef } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { Text, Platform, Linking } from 'react-native'
import { useRecoilState } from 'recoil'

import { defaultImages } from '@/assets'
import i18n from '@/locales'
import { DefaultMenuType, ProfileMenus } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'
import { createCancelConfirmAlert } from '@/services/Alert'
import { checkPermission } from '@/services/PermissionService'
import { handleCameraOpen, handleImageSelect } from '@/services/imagePicker'
import { ProfileImageState } from '@/state/ProfileImageState'
import { colors } from '@/styles/colors'

import { Container, EmptyProfile, ProfileImage, UploadButton } from './Profile.style'

/**
 * Profile
 */
const Profile = () => {
  const [profileImage, setProfileImage] = useRecoilState(ProfileImageState)
  const actionSheetRef = useRef<ActionSheet>(null)

  /**
   * handleUploadButton
   */
  const handleUploadButton = () => {
    actionSheetRef.current?.show()
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = async (index: DefaultMenuType) => {
    switch (index) {
      case DefaultMenuType.selectDefaultImage: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setProfileImage(defaultImages.profile)
        break
      }
      case DefaultMenuType.selectFromPhotoLibrary: {
        const permission = await checkPermission(Permissions.PhotoLibrary)

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

        const image = await handleImageSelect()
        image && setProfileImage({ uri: image.path })
        break
      }
      case DefaultMenuType.selectFromCamera: {
        const permission = await checkPermission(Permissions.Camera)

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

        const image = await handleCameraOpen()
        image && setProfileImage({ uri: image.path })
        break
      }
    }
  }

  return (
    <Container>
      {profileImage ? <ProfileImage source={profileImage} /> : <EmptyProfile />}
      <UploadButton onPress={handleUploadButton}>
        <Text>{profileImage ? i18n.t('edit') : i18n.t('upload')}</Text>
      </UploadButton>
      <ActionSheet
        ref={actionSheetRef}
        title={i18n.t('setProfile')}
        options={ProfileMenus()}
        cancelButtonIndex={0}
        tintColor={colors.gray600}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </Container>
  )
}

export default Profile
