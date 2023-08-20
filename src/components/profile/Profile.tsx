import React, { useRef } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { useRecoilState } from 'recoil'

import { defaultImages } from '@/assets'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
import { getActionSheetTintColor } from '@/services/StyleService'
import { ProfileImageState } from '@/state/ProfileImageState'

import { ButtonText, Container, ProfileImage, UploadButton } from './Profile.style'

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
    const selectedImage = await handleDefaultImageMenu(index)

    if (!selectedImage) {
      return
    }

    switch (selectedImage) {
      case 'default':
        setProfileImage(null)
        break
      default:
        setProfileImage({ uri: selectedImage })
    }
  }

  return (
    <Container>
      {profileImage ? (
        <ProfileImage source={profileImage} />
      ) : (
        <ProfileImage source={defaultImages.profile} />
      )}
      <UploadButton onPress={handleUploadButton}>
        <ButtonText>{profileImage ? i18n.t('edit') : i18n.t('upload')}</ButtonText>
      </UploadButton>
      <ActionSheet
        ref={actionSheetRef}
        title={i18n.t('setProfile')}
        options={DefalutMenus()}
        cancelButtonIndex={0}
        tintColor={getActionSheetTintColor()}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </Container>
  )
}

export default Profile
