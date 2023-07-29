import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { useNavigation } from '@react-navigation/native'
import {
  Image,
  ImageURISource,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getUserInfo } from '@/apis/user'
import { defaultIcons, defaultImages } from '@/assets'
import { Divider } from '@/components/divider/Divider'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { createCancelConfirmAlert } from '@/services/Alert'
import { checkAndRequestPermission } from '@/services/PermissionService'
import { handleCameraOpen, handleImageSelect } from '@/services/imagePicker'
import { ProfileImageState } from '@/state/ProfileImageState'
import { colors } from '@/styles/colors'

import {
  InfoContainer,
  InfoText,
  InfoTitle,
  ProfileContainer,
  ProfileImage,
  Button,
  ButtonText,
  PencilIcon,
  RowView,
  Footer,
  FooterText,
} from './MyAccount.style'

/**
 *
 */
export const MyAccount = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const [editMode, setEditMode] = useState(false)
  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [profileImage, setProfileImage] = useRecoilState(ProfileImageState)
  const actionSheetRef = useRef<ActionSheet>(null)

  const {
    data: userInfoData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUserInfo'], () => getUserInfo())

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          title={i18n.t('myAccount')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={() => setEditMode(!editMode)}
        />
      ),
    })
  })

  /**
   * handleImageEdit
   */
  const handleImageEdit = () => {
    actionSheetRef.current?.show()
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = async (index: DefaultMenuType) => {
    switch (index) {
      case DefaultMenuType.selectDefaultImage: {
        setProfileImage(null)
        break
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

        const image = await handleImageSelect()
        image && setProfileImage({ uri: image.path })
        break
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

        const image = await handleCameraOpen()
        image && setProfileImage({ uri: image.path })
        break
      }
    }
  }

  return (
    <>
      <ScrollView>
        <ProfileContainer>
          <ProfileImage
            source={
              isProfileImageError || !userInfoData?.imgUrl
                ? defaultImages.profile
                : { uri: userInfoData?.imgUrl }
            }
            onError={() => setIsProfileImageError(true)}
            defaultSource={defaultImages.profile as ImageURISource}
          />
          {editMode && (
            <Button onPress={handleImageEdit}>
              <ButtonText>{i18n.t('edit')}</ButtonText>
            </Button>
          )}
        </ProfileContainer>

        <InfoContainer>
          <RowView>
            <InfoTitle>{i18n.t('name')}</InfoTitle>
            <InfoText>{userInfoData?.name}</InfoText>
          </RowView>
          <Divider />
          <RowView>
            <InfoTitle>{i18n.t('email')}</InfoTitle>
            <InfoText>{userInfoData?.email}</InfoText>
          </RowView>
          <Divider />
          <RowView>
            <InfoTitle>{i18n.t('nickName')}</InfoTitle>
            <InfoText>{userInfoData?.nickname}</InfoText>
            <PencilIcon>{editMode && <Image source={defaultIcons.pencil} />}</PencilIcon>
          </RowView>
          <Divider />
        </InfoContainer>

        <ActionSheet
          ref={actionSheetRef}
          title={i18n.t('setProfile')}
          options={DefalutMenus()}
          cancelButtonIndex={0}
          tintColor={colors.gray600}
          onPress={handleActionSheetMenu}
          theme="ios"
        />
      </ScrollView>

      {editMode && (
        <Footer>
          <TouchableOpacity>
            <FooterText>{i18n.t('deleteAccount')}</FooterText>
          </TouchableOpacity>
        </Footer>
      )}
    </>
  )
}
