import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { deleteTag, getTag, postTag } from '@/apis/tag'
import { InputDialog } from '@/components/dialogs/inputDialog/InputDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  ButtonText,
  DeleteButton,
  GrayDivider,
  PlusButton,
  TagListContainer,
  Text,
} from './TagManagement.style'

/**
 * 마이페이지 '태그 관리'
 */
export const TagManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [editMode, setEditMode] = useState(false)
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [text, setText] = useState('')

  const { data: tagData } = useQuery(['getTagData'], () => getTag(false))

  const { mutate: postTagMutate } = useMutation(postTag)

  const { mutate: deleteTagMutate } = useMutation(deleteTag)

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          title={i18n.t('tagManagement')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={() => setEditMode(!editMode)}
        />
      ),
    })
  })

  /**
   * 새로운 태그를 생성합니다.
   */
  const handleCreate = () => {
    postTagMutate(text)
    // getTag 리패치 필요
  }

  /**
   * 선택한 tag를 삭제합니다.
   */
  const handleDelete = (tagId: number) => {
    deleteTagMutate(tagId)
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {tagData && editMode
          ? tagData?.map((tag) => (
              <>
                <TagListContainer key={tag.tagId}>
                  <Text>{tag.name}</Text>
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
                    handleDelete(tag.tagId)
                  }}
                />
              </>
            ))
          : tagData?.map((tag) => (
              <>
                <TagListContainer key={tag.tagId}>
                  <Text>{tag.name}</Text>
                </TagListContainer>
                <GrayDivider />
              </>
            ))}

        <PlusButton onPress={() => setIsCreateDialogVisible(true)}>
          <ButtonText>{`+ ${i18n.t('addTag')}`}</ButtonText>
        </PlusButton>
      </ScrollView>
      <InputDialog
        isVisible={isCreateDialogVisible}
        title="createNewTag"
        text={text}
        setText={setText}
        completeText="register"
        onCancel={() => {
          setIsCreateDialogVisible(false)
        }}
        onComplete={() => {
          setIsCreateDialogVisible(false)
          handleCreate()
        }}
        isDisabled={text.length === 0}
        placeholder={i18n.t('placeHolderTag')}
      />
    </>
  )
}
