import React, { useRef } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { Text, Platform, Linking } from 'react-native'
import { useRecoilState } from 'recoil'

import { defaultImages } from '@/assets'
import i18n from '@/locales'
import { Permissions } from '@/models/enums/Permissions'
import { ProfileMenuType } from '@/models/enums/ProfileMenuType'
import { ProfileImageState } from '@/recoils/ProfileImageState'
import { createCancleConfirmAlert } from '@/services/Alert'
import { checkPermission } from '@/services/PermissionService'
import { handleCameraOpen, handleImageSelect } from '@/services/imagePicker'
import { colors } from '@/styles/colors'

import { Container, EmptyProfile, ProfileImage, UploadButton } from './Profile.style'

/**
 * Profile
 */
const Profile = () => {
  const [profileImage, setProfileImage] = useRecoilState(ProfileImageState)
  const actionSheetRef = useRef<ActionSheet>()

  /**
   * handleUploadButton
   */
  const handleUploadButton = () => {
    actionSheetRef.current?.show()
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = async (index: ProfileMenuType) => {
    switch (index) {
      case ProfileMenuType.SelectDefaultImage: {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        setProfileImage(defaultImages.profile)
        break
      }
      case ProfileMenuType.selectFromPhotoLibrary: {
        const permision = await checkPermission(Permissions.PhotoLibrary)

        if (permision === 'blocked' || permision === 'denied') {
          createCancleConfirmAlert(
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
      case ProfileMenuType.selectFromCamera: {
        const permision = await checkPermission(Permissions.Camera)

        if (permision === 'blocked' || permision === 'denied') {
          createCancleConfirmAlert(
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
        options={options}
        cancelButtonIndex={0}
        tintColor={colors.gray600}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </Container>
  )
}

const options = [
  i18n.t('cancel'),
  i18n.t('selectDefaultImage'),
  i18n.t('selectFromPhotoLibrary'),
  i18n.t('selectFromCamera'),
]

export default Profile
