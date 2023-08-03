import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { deleteBlock, getBlockList } from '@/apis/block'
import { defaultImages } from '@/assets'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  ButtonText,
  UnblockButton,
  GrayDivider,
  ImageContainer,
  SubTitleText,
  ListContainer,
  Text,
} from './BlockManagement.style'

/**
 *
 * 마이페이지 '차단 관리'
 */
export const BlockManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [isUnblockDialogVisible, setIsUnblockDialogVisible] = useState(false)
  const [isUnblockCompleteDialogVisible, setIsUnblockCompleteDialogVisible] = useState(false)

  const { data: blockUserData } = useQuery(['getBlockList'], () => getBlockList())

  const { mutate: deleteBlockMutate } = useMutation(deleteBlock, {
    /**
     *
     */
    onSuccess: () => {
      setIsUnblockCompleteDialogVisible(true)
    },
  })

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => <LeftButtonHeader title={i18n.t('blockManagement')} />,
    })
  })

  /**
   * 선택한 유저를 차단 해제 합니다.
   */
  const handleUnblock = (userId: number) => {
    deleteBlockMutate(userId)
  }

  return (
    <>
      <ScrollView>
        {blockUserData?.users && blockUserData.users.length > 0 ? (
          blockUserData.users.map((user) => (
            <>
              <ListContainer key={user.id}>
                <Text>{user.nickname}</Text>
                <UnblockButton onPress={() => setIsUnblockDialogVisible(true)}>
                  <ButtonText>{`${i18n.t('block')} ${i18n.t('unblock')}`}</ButtonText>
                </UnblockButton>
              </ListContainer>
              <GrayDivider />
              <TwoButtonDialog
                isVisible={isUnblockDialogVisible}
                title={i18n.t('doYouWantUnblockThisUser', { nickname: user.nickname })}
                completeText="unblock"
                onCancel={() => {
                  setIsUnblockDialogVisible(false)
                }}
                onComplete={() => {
                  setIsUnblockDialogVisible(false)
                  handleUnblock(user.id)
                }}
              />
              <DefaultDialog
                isVisible={isUnblockCompleteDialogVisible}
                title={i18n.t('unblockComplete', { nickname: user.nickname })}
                imageUrl={defaultImages.unblockComplete}
                buttonText="backToMypage"
                onClick={() => {
                  setIsUnblockCompleteDialogVisible(false)
                  navigation.navigate('Mypage')
                }}
              />
            </>
          ))
        ) : (
          <ImageContainer>
            <Image source={defaultImages.emptyItem} />
            <SubTitleText>{i18n.t('noAuthorBlocked')}</SubTitleText>
          </ImageContainer>
        )}
      </ScrollView>
    </>
  )
}
