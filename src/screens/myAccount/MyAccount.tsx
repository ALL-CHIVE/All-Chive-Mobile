import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { useNavigation } from '@react-navigation/native'
import { Image, ImageURISource, ScrollView, TouchableOpacity } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { deleteWithdrawal } from '@/apis/auth'
import { getUserInfo } from '@/apis/user'
import { defaultIcons, defaultImages } from '@/assets'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { Divider } from '@/components/divider/Divider'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
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
 * 마이페이지 '내 계정' 화면
 */
export const MyAccount = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const actionSheetRef = useRef<ActionSheet>(null)
  const queryClient = useQueryClient()

  const [profileImage, setProfileImage] = useRecoilState(ProfileImageState)

  const [editMode, setEditMode] = useState(false)
  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [isWithdrawDialogVisible, setIsWithdrawDialogVisible] = useState(false)

  const {
    data: userInfoData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUserInfo'], () => getUserInfo())

  const { mutate: withdrawMutation } = useMutation(deleteWithdrawal, {
    /**
     * 회원탈퇴 성공 시 로그인 화면으로 넘어갑니다.
     */
    onSuccess: () => {
      navigation.navigate('Login')
    },
  })

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

  /**
   * 회원탈퇴를 합니다.
   */
  const handleWithdraw = () => {
    // TODO: 회원탈퇴
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
      </ScrollView>

      {editMode && (
        <Footer>
          <TouchableOpacity onPress={() => setIsWithdrawDialogVisible(true)}>
            <FooterText>{i18n.t('deleteAccount')}</FooterText>
          </TouchableOpacity>
        </Footer>
      )}
    </>
  )
}
