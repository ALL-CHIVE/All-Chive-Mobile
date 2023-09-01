import React, { useState } from 'react'

import { useMutation, useQueryClient } from 'react-query'

import { deleteTag } from '@/apis/tag/Tag'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import i18n from '@/locales'

import { ButtonText, DeleteButton, TagListContainer, Text } from '../TagManagement.style'

interface TagListProps {
  id: number
  tag: string
  editMode: boolean
}

/**
 * 태그 관리 리스트
 */
export const TagList = ({ id, tag, editMode }: TagListProps) => {
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
      <TagListContainer key={id}>
        <Text>{tag}</Text>
        {editMode && (
          <DeleteButton onPress={() => setIsDeleteDialogVisible(true)}>
            <ButtonText>{i18n.t('delete')}</ButtonText>
          </DeleteButton>
        )}
      </TagListContainer>
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
  )
}
