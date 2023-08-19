import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { useNavigation } from '@react-navigation/native'
import { ImageSourcePropType, ImageURISource, TouchableOpacity, View } from 'react-native'
import Config from 'react-native-config'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { deleteWithdrawal } from '@/apis/auth'
import { getUserInfo, postUserInfo } from '@/apis/user'
import { defaultImages } from '@/assets'
import PencilIcon from '@/assets/icons/pencil.svg'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { Divider } from '@/components/divider/Divider'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import NicknameEditModal from '@/components/modal/nicknameEditModal/NicknameEditModal'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { SignInType } from '@/models/enums/SignInType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
import { uploadProfileImage } from '@/services/ImageService'
import { getAppleAuthCode } from '@/services/SignInService'
import { colors } from '@/styles/colors'

import {
  InfoContainer,
  InfoText,
  InfoTitle,
  ProfileContainer,
  ProfileImage,
  Button,
  ButtonText,
  PencilButton,
  RowView,
  Footer,
  FooterText,
  Container,
} from './MyAccount.style'

/**
 * 마이페이지 '내 계정' 화면
 */
export const MyAccount = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const actionSheetRef = useRef<ActionSheet>(null)
  const queryClient = useQueryClient()

  const [profileImage, setProfileImage] = useState<ImageSourcePropType>()
  const [profileImageKey, setProfileImageKey] = useState<string>('')
  const [editMode, setEditMode] = useState(false)
  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [isWithdrawDialogVisible, setIsWithdrawDialogVisible] = useState(false)
  const [nickname, setNickname] = useState('')
  const [isNicknameEditModalVisible, setIsNicknameEditModalVisible] = useState(false)

  const {
    data: userInfoData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUserInfo'], () => getUserInfo(), {
    /**
     *
     */
    onSuccess: (userInfoData) => {
      userInfoData.imgUrl &&
        setProfileImage({ uri: `${Config.ALLCHIVE_ASSET_SERVER}/${userInfoData.imgUrl}` })
      setProfileImageKey(userInfoData.imgUrl)
      setNickname(userInfoData.nickname)
    },
  })

  const { mutate: postUserInfoMutation } = useMutation(
    () =>
      postUserInfo(
        profileImage ? profileImageKey : '',
        userInfoData?.email ?? '',
        userInfoData?.name ?? '',
        nickname
      ),
    {
      /**
       *
       */
      onSuccess: () => {
        queryClient.invalidateQueries(['getUser'])
      },
    }
  )

  const { mutate: withdrawMutation } = useMutation(deleteWithdrawal, {
    /**
     * 회원탈퇴 성공 시 로그인 화면으로 넘어갑니다.
     */
    onSuccess: () => {
      navigation.navigate('Login')
    },
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
    const selectedImage = await handleDefaultImageMenu(index)

    if (!selectedImage) {
      return
    }

    switch (selectedImage) {
      case 'default':
        setProfileImage(undefined)
        break
      default:
        setProfileImage({ uri: selectedImage })
    }
  }

  /**
   * 회원탈퇴를 합니다.
   */
  const handleWithdraw = async () => {
    switch (userInfoData?.oauthProvider) {
      case SignInType.Kakao:
        withdrawMutation('')
        break
      case SignInType.Apple: {
        const authCode = await getAppleAuthCode()
        withdrawMutation(authCode)
      }
    }
  }

  /**
   * handleRightButton
   */
  const handleRightButton = async () => {
    if (editMode) {
      const imageUrl = (profileImage as ImageURISource)?.uri ?? ''
      const contentImageUrl = await uploadProfileImage(imageUrl)
      contentImageUrl && setProfileImageKey(contentImageUrl)

      postUserInfoMutation()
    }

    setEditMode((prev) => !prev)
  }

  /**
   * handleNicknameChange
   */
  const handleNicknameChange = (nickname: string) => {
    setNickname(nickname)
    setIsNicknameEditModalVisible(false)
  }

  /**
   *
   */
  const handleEditNickname = () => {
    setIsNicknameEditModalVisible(true)
  }

  return (
    <>
      {isProfileLoading && <Loading />}
      <ErrorDialog
        isVisible={isProfileError}
        onClick={() => {
          queryClient.invalidateQueries(['getUserInfo'])
        }}
      />
      <DefaultContainer>
        <View style={{ maxWidth: 375 }}>
          <LeftButtonHeader
            title={i18n.t('myAccount')}
            rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
            rightButtonClick={handleRightButton}
          />
        </View>
        <DefaultScrollContainer>
          <Container>
            <ProfileContainer>
              <ProfileImage
                source={isProfileImageError || !profileImage ? defaultImages.profile : profileImage}
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
                <InfoText>{nickname}</InfoText>
                <PencilButton onPress={handleEditNickname}>
                  {editMode && <PencilIcon />}
                </PencilButton>
              </RowView>
              <Divider />
            </InfoContainer>
          </Container>
        </DefaultScrollContainer>
        <TwoButtonDialog
          isVisible={isWithdrawDialogVisible}
          title="doYouWantWithdrawal"
          description="deletedAccountCannotRestore"
          completeText="delete"
          onCancel={() => {
            setIsWithdrawDialogVisible(false)
          }}
          onComplete={() => {
            setIsWithdrawDialogVisible(false)
            handleWithdraw()
          }}
        />
        <ActionSheet
          ref={actionSheetRef}
          title={i18n.t('setProfile')}
          options={DefalutMenus()}
          cancelButtonIndex={0}
          tintColor={colors.gray600}
          onPress={handleActionSheetMenu}
          theme="ios"
        />
        {editMode && (
          <Footer>
            <TouchableOpacity onPress={() => setIsWithdrawDialogVisible(true)}>
              <FooterText>{i18n.t('deleteAccount')}</FooterText>
            </TouchableOpacity>
          </Footer>
        )}
        <NicknameEditModal
          isVisible={isNicknameEditModalVisible}
          onCancle={() => setIsNicknameEditModalVisible(false)}
          onSuccess={handleNicknameChange}
        />
      </DefaultContainer>
    </>
  )
}
