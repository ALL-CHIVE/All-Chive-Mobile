import React, { useState } from 'react'

import { AxiosError } from 'axios'
import { useQuery, useQueryClient } from 'react-query'

import { getArchivingList } from '@/apis/archiving'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import { CreateArchivingModal } from '@/components/modal/archivingModal/createArchivingModal/CreateArchivingModal'
import i18n from '@/locales'

import { Bottom, PlusButton, PlusButtonText, ScrollContainer } from './ArchivingManagement.style'
import { ArchivingList } from './components/ArchivingList'

/**
 * 아카이빙 관리
 */
export const ArchivingManagement = () => {
  const queryClient = useQueryClient()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  const {
    data: archivingListData,
    isLoading,
    isError,
  } = useQuery('archivingList', () => getArchivingList(), {
    /**
     *
     */
    onError: (e: AxiosError) => {},
  })

  /**
   * 생성 모달을 종료합니다.
   */
  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false)
  }

  return (
    <>
      {isLoading && <Loading />}
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['archivingList'])
        }}
      />
      <DefaultContainer>
        <LeftButtonHeader title={i18n.t('archivingManagement')} />
        <ScrollContainer
          bounces={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {archivingListData &&
            Object.keys(archivingListData).map(
              (category) =>
                archivingListData[category].length > 0 && (
                  <ArchivingList
                    key={category}
                    category={category}
                    archivingListData={archivingListData[category]}
                  />
                )
            )}
          <PlusButton onPress={() => setIsCreateModalVisible(true)}>
            <PlusButtonText>{`+ ${i18n.t('addArchiving')}`}</PlusButtonText>
          </PlusButton>
          <Bottom />
        </ScrollContainer>
        <CreateArchivingModal
          onClose={handleCloseCreateModal}
          isVisible={isCreateModalVisible}
        />
      </DefaultContainer>
    </>
  )
}
