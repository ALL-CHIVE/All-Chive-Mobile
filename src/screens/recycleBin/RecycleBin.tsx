import React, { useState } from 'react'

import LinearGradient from 'react-native-linear-gradient'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { deleteRecycles, getRecycles, patchRecycles } from '@/apis/recycle'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'
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
  const queryClient = useQueryClient()

  const [editMode, setEditMode] = useState(false)
  const [isCheckArchiving, setIsCheckArchiving] = useRecoilState(CheckArchivingState)
  const [isCheckContent, setIsCheckContent] = useRecoilState(CheckContentState)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isDeleteError, setIsDeleteError] = useState(false)
  const [visibleErrorDialog, setVisibleErrorDialog] = useState(false)

  const {
    data: recycleData,
    isLoading,
    isError,
  } = useQuery<RecyclesResponse>(['recycleBinData'], getRecycles)

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

    /**
     *
     */
    onError: () => {
      setIsDeleteError(true)
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
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries('recycleBinData')
        }}
      />
      {visibleErrorDialog && (
        <ErrorDialog
          isVisible={true}
          onClick={() => {
            setVisibleErrorDialog(false)
          }}
        />
      )}
      <DefaultContainer>
        <LeftButtonHeader
          title={i18n.t('recycleBin')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={handleEditMode}
        />
        <Container>
          {recycleData && (recycleData.archivings.length > 0 || recycleData.contents.length > 0) ? (
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
          onClose={() => isDeleteError && setVisibleErrorDialog(true)}
          onComplete={handleDelete}
        />
      </DefaultContainer>
    </>
  )
}
