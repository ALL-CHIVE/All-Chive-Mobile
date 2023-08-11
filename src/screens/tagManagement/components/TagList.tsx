import React, { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'

import { deleteTag } from '@/apis/tag'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import i18n from '@/locales'

import {
  ButtonText,
  DeleteButton,
  GrayDivider,
  TagListContainer,
  Text,
} from '../TagManagement.style'

interface TagListProps {
  id: number
  name: string
  editMode: boolean
}

/**
 * 태그 관리 리스트
 */
export const TagList = ({ id, name, editMode }: TagListProps) => {
  const queryClient = useQueryClient()

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)

  const { mutate: deleteTagMutate } = useMutation(deleteTag, {
    /**
     * deleteTag 성공 시 getTagData를 리패치합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries('getTagData')
    },
  })

  /**
   * 선택한 tag를 삭제합니다.
   */
  const handleDelete = (tagId: number) => {
    deleteTagMutate(tagId)
  }

  return (
    <>
      {editMode ? (
        <>
          <TagListContainer key={id}>
            <Text>{name}</Text>
            <DeleteButton onPress={() => setIsDeleteDialogVisible(true)}>
              <ButtonText>{i18n.t('delete')}</ButtonText>
            </DeleteButton>
          </TagListContainer>
          <GrayDivider />
          <TwoButtonDialog
            isVisible={isDeleteDialogVisible}
            title="doYouWantDeleteThisTag"
            description="deleteTagsCannotBeRestored"
            completeText="delete"
            onCancel={() => {
              setIsDeleteDialogVisible(false)
            }}
            onComplete={() => {
              setIsDeleteDialogVisible(false)
              handleDelete(id)
            }}
          />
        </>
      ) : (
        <>
          <TagListContainer key={id}>
            <Text>{name}</Text>
          </TagListContainer>
          <GrayDivider />
        </>
      )}
    </>
  )
}
