import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { deleteRecycles, getRecycles, patchRecycles } from '@/apis/recycle'
import { defaultImages } from '@/assets'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { CheckArchivingState, CheckContentState } from '@/state/CheckState'
import { colors } from '@/styles/colors'

import {
  BottomButton,
  BottomButtonContainer,
  BottomButtonText,
  BottomButtonTitle,
  Container,
  ImageContainer,
  SubTitleText,
  TabContainer,
} from './RecycleBin.style'
import { RecycleBinTab } from './tabs/RecycleBinTab'

/**
 * 마이페이지 '휴지통'
 */
export const RecycleBin = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [editMode, setEditMode] = useState(false)
  const [isCheckArchiving, setIsCheckArchiving] = useRecoilState(CheckArchivingState)
  const [isCheckContent, setIsCheckContent] = useRecoilState(CheckContentState)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)

  const { data: recycleData } = useQuery<RecyclesResponse>(['recycleBinData'], getRecycles)

  const { mutate: deleteMutate } = useMutation(deleteRecycles, {
    /**
     * 삭제 성공 시 recycleBinData 쿼리를 리패치하고, 체크박스를 초기화합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries('recycleBinData')
      setIsCheckArchiving([])
      setIsCheckContent([])
      setIsDeleteDialogVisible(false)
    },
  })

  const { mutate: restoreMutate } = useMutation(patchRecycles, {
    /**
     * 복구 성공 시 recycleBinData 쿼리를 리패치하고, 체크박스를 초기화합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries('recycleBinData')
      setIsCheckArchiving([])
      setIsCheckContent([])
    },
  })

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          title={i18n.t('recycleBin')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={handleEditMode}
        />
      ),
    })
  })

  /**
   * 편집 모드를 변경합니다.
   */
  const handleEditMode = () => {
    setEditMode(!editMode)
    setIsCheckArchiving([])
    setIsCheckContent([])
  }

  /**
   * 영구 삭제 경고 다이얼로그를 띄웁니다.
   */
  const handleDeleteDialog = () => {
    setIsDeleteDialogVisible(true)
  }

  /**
   * 선택한 아카이빙 및 컨텐츠를 삭제합니다.
   */
  const handleDelete = () => {
    deleteMutate({
      archivingIds: isCheckArchiving,
      contentIds: isCheckContent,
    })
  }

  /**
   * 선택한 아카이빙 및 컨텐츠를 복구합니다.
   */
  const handleRestore = () => {
    restoreMutate({
      archivingIds: isCheckArchiving,
      contentIds: isCheckContent,
    })
  }

  return (
    <Container>
      {recycleData ? (
        <>
          <TabContainer>
            <RecycleBinTab
              contents={recycleData.contents}
              archivings={recycleData.archivings}
              editMode={editMode}
            />
          </TabContainer>

          {editMode && (
            <BottomButtonContainer>
              <LinearGradient
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 24,
                }}
                colors={[colors.white, colors.gray500]}
              >
                <BottomButton onPress={handleDeleteDialog}>
                  <BottomButtonText>{i18n.t('allDelete')}</BottomButtonText>
                </BottomButton>
                {isCheckArchiving.length > 0 || isCheckContent.length > 0 ? (
                  <>
                    <BottomButtonTitle>
                      {i18n.t('numberOfSelectItem', {
                        number: isCheckArchiving.length + isCheckContent.length,
                      })}
                    </BottomButtonTitle>
                  </>
                ) : (
                  <>
                    <BottomButtonTitle>{i18n.t('selectItem')}</BottomButtonTitle>
                  </>
                )}

                <BottomButton onPress={handleRestore}>
                  <BottomButtonText>{i18n.t('allRestore')}</BottomButtonText>
                </BottomButton>
              </LinearGradient>
            </BottomButtonContainer>
          )}

          <TwoButtonDialog
            isVisible={isDeleteDialogVisible}
            title="persistentDeleteWarning"
            completeText={i18n.t('delete')}
            onCancel={() => setIsDeleteDialogVisible(false)}
            onComplete={handleDelete}
          />
        </>
      ) : (
        <>
          <ImageContainer>
            <Image source={defaultImages.emptyItem} />
            <SubTitleText>{i18n.t('emptyRecycleBin')}</SubTitleText>
          </ImageContainer>
        </>
      )}
    </Container>
  )
}
