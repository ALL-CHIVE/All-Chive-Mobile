import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { AxiosError } from 'axios'
import { Image, TouchableOpacity } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'

import { deleteArchiving } from '@/apis/archiving'
import { defaultIcons, defaultImages } from '@/assets'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { EditArchivingModal } from '@/components/modal/archivingModal/editArchivingModal/EditArchivingModal'
import i18n from '@/locales'
import { ArchivingItem } from '@/models/Archiving'
import { EditDeleteMenuType, EditDeleteMenus } from '@/models/enums/ActionSheetType'
import { colors } from '@/styles/colors'

import {
  ArchivingContainer,
  CategoryBox,
  CategoryContainer,
  CategoryCount,
  CategoryText,
  Container,
  GrayText,
} from './ArchivingList.style'

interface ArchivingListProps {
  category: string
  archivingListData: ArchivingItem[]
}

/**
 * 마이페이지 내 '아카이빙 관리'에서 보여지는 아카이빙 리스트
 */
export const ArchivingList = ({ category, archivingListData }: ArchivingListProps) => {
  const actionSheetRef = useRef<ActionSheet>(null)
  const queryClient = useQueryClient()

  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [currentArchivingId, setCurrentArchivingId] = useState<number>(-1)

  const { mutate: deleteMutate } = useMutation(deleteArchiving, {
    /**
     * deleteMutate 성공 시 아카이빙 관리 페이지의 아카이빙 리스트를 리패치합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['archivingList'])
      queryClient.invalidateQueries(['getUser'])
    },

    /**
     *
     */
    onError: (e: AxiosError) => {
      console.log(e.response?.data)
    },
  })

  /**
   * 미트볼 버튼 클릭시 작동
   */
  const handleActionSheet = (value: number) => {
    actionSheetRef.current?.show()
    setCurrentArchivingId(value)
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = (index: EditDeleteMenuType) => {
    switch (index) {
      case EditDeleteMenuType.update: {
        setIsEditModalVisible(true)
        break
      }
      case EditDeleteMenuType.remove: {
        setIsDeleteDialogVisible(true)
        break
      }
    }
  }

  /**
   *
   */
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false)
  }

  /**
   *
   */
  const handleDelete = () => {
    deleteMutate(currentArchivingId)
  }

  return (
    <Container>
      <CategoryContainer>
        <CategoryBox>
          <CategoryText>{i18n.t(`${category}`)}</CategoryText>
        </CategoryBox>
        <CategoryCount>{archivingListData.length}</CategoryCount>
      </CategoryContainer>
      {archivingListData.map((item) => (
        <ArchivingContainer key={item.archivingId}>
          <GrayText>{`${item.title}  ${item.contentCnt}`}</GrayText>
          <TouchableOpacity onPress={() => handleActionSheet(item.archivingId)}>
            <Image source={defaultIcons.popup} />
          </TouchableOpacity>
        </ArchivingContainer>
      ))}
      <EditArchivingModal
        archivingId={currentArchivingId}
        onClose={handleCloseEditModal}
        isVisible={isEditModalVisible}
      />
      <TwoButtonDialog
        isVisible={isDeleteDialogVisible}
        title="doYouWantDeleteThisArchiving"
        imageUrl={defaultImages.recycleBin}
        completeText="delete"
        onCancel={() => {
          setIsDeleteDialogVisible(false)
        }}
        onComplete={() => {
          setIsDeleteDialogVisible(false)
          handleDelete()
        }}
      />
      <ActionSheet
        ref={actionSheetRef}
        options={EditDeleteMenus()}
        cancelButtonIndex={0}
        onPress={handleActionSheetMenu}
        tintColor={colors.gray600}
        theme="ios"
      />
    </Container>
  )
}
