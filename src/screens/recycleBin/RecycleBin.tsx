import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { deleteRecycles, getRecycles, patchRecycles } from '@/apis/recycle/Recycle'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import { TemporaryErrorDialog } from '@/components/dialogs/errorDialog/TemporaryErrorDialog/TemporaryErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
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
} from './RecycleBin.style'
import { RecycleBinTab } from './tabs/RecycleBinTab'

/**
 * 마이페이지 '휴지통'
 */
export const RecycleBin = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [editMode, setEditMode] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)
  const [deleteErrorVisible, setDeleteErrorVisible] = useState(false)

  const [isCheckArchiving, setIsCheckArchiving] = useRecoilState(CheckArchivingState)
  const [isCheckContent, setIsCheckContent] = useRecoilState(CheckContentState)

  const { data: recycleData, isLoading } = useQuery<RecyclesResponse>(
    ['recycleBinData'],
    getRecycles,
    {
      /**
       *
       */
      onError: () => {
        setErrorDialogVisible(true)
      },
    }
  )

  const { mutate: deleteMutate, isError: deleteError } = useMutation(deleteRecycles, {
    /**
     * 삭제 성공 시 recycleBinData 쿼리를 리패치하고, 체크박스를 초기화합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries('recycleBinData')
      setIsCheckArchiving([])
      setIsCheckContent([])
      setIsDeleteDialogVisible(false)
    },

    /**
     *
     */
    onError: () => {
      setIsDeleteDialogVisible(false)
    },
  })

  const { mutate: restoreMutate } = useMutation(patchRecycles, {
    /**
     * 복구 성공 시 recycleBinData 쿼리를 리패치하고, 체크박스를 초기화합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries('recycleBinData')
      queryClient.invalidateQueries(['getUser'])
      queryClient.invalidateQueries(['getHomeArchivingList'])
      queryClient.invalidateQueries(['getPopularArchivings'])
      queryClient.invalidateQueries(['getCommunityArchivingList'])
      queryClient.invalidateQueries(['getScrapArchivingList'])
      setIsCheckArchiving([])
      setIsCheckContent([])
    },
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
    <>
      {isLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries('recycleBinData')
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      <TemporaryErrorDialog
        isVisible={deleteErrorVisible}
        onClick={() => {
          setDeleteErrorVisible(false)
        }}
      />
      <DefaultContainer>
        <LeftButtonHeader
          title={i18n.t('recycleBin')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={handleEditMode}
        />
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={(e) => {
            if (e.nativeEvent.state === State.ACTIVE) {
              navigation.goBack()
            }
          }}
        >
          <Container>
            {recycleData &&
            (recycleData.archivings.length > 0 || recycleData.contents.length > 0) ? (
              <RecycleBinTab
                contents={recycleData.contents}
                archivings={recycleData.archivings}
                editMode={editMode}
              />
            ) : (
              <EmptyItem
                textKey="emptyRecycleBin"
                marginTop={120}
              />
            )}
          </Container>
        </FlingGestureHandler>

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
          onClose={() => deleteError && setDeleteErrorVisible(true)}
          onComplete={handleDelete}
        />
      </DefaultContainer>
    </>
  )
}
