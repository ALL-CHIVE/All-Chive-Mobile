import React from 'react'
import { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useMutation } from 'react-query'

import { deleteBlock } from '@/apis/block'
import { defaultImages } from '@/assets'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import i18n from '@/locales'
import { UserData } from '@/models/Block'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { ButtonText, ListContainer, Text, UnblockButton } from '../BlockManagement.style'

/**
 * 차단 관리 리스트
 */
export const BlockList = ({ nickname, id }: UserData) => {
  const navigation = useNavigation<MainNavigationProp>()
  const [ownerNickname, setOwnerNickname] = useState('')

  const [isUnblockDialogVisible, setIsUnblockDialogVisible] = useState(false)
  const [isUnblockCompleteDialogVisible, setIsUnblockCompleteDialogVisible] = useState(false)

  const { mutate: deleteBlockMutate } = useMutation(deleteBlock, {
    /**
     *
     */
    onSuccess: (response) => {
      setOwnerNickname(response.nickname)
      setIsUnblockCompleteDialogVisible(true)
    },

    /**
     *
     */
    onError: () => {
      setIsUnblockCompleteDialogVisible(true)
    },
  })

  /**
   * 선택한 유저를 차단 해제 합니다.
   */
  const handleUnblock = (userId: number) => {
    deleteBlockMutate(userId)
  }

  return (
    <>
      <ListContainer key={id}>
        <Text>{nickname}</Text>
        <UnblockButton onPress={() => setIsUnblockDialogVisible(true)}>
          <ButtonText>{`${i18n.t('block')} ${i18n.t('unblock')}`}</ButtonText>
        </UnblockButton>
      </ListContainer>
      <TwoButtonDialog
        isVisible={isUnblockDialogVisible}
        title={i18n.t('doYouWantUnblockThisUser', { nickname: nickname })}
        completeText="unblock"
        onCancel={() => {
          setIsUnblockDialogVisible(false)
        }}
        onComplete={() => {
          setIsUnblockDialogVisible(false)
        }}
        onClose={(isComlete: boolean) => isComlete && handleUnblock(id)}
      />
      <DefaultDialog
        isVisible={isUnblockCompleteDialogVisible}
        title={i18n.t('unblockComplete', { nickname: ownerNickname })}
        imageUrl={defaultImages.unblockComplete}
        buttonText="backToMypage"
        onClick={() => {
          setIsUnblockCompleteDialogVisible(false)
          navigation.navigate('Mypage')
        }}
      />
    </>
  )
}
