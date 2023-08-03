import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { deleteTag, getTag } from '@/apis/tag'
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
 *
 */
export const TagManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [editMode, setEditMode] = useState(false)
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false)

  const { data: tagData } = useQuery(['getTagData'], () => getTag(false))

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
   * 선택한 tag를 삭제합니다.
   */
  const handleDelete = (tagId: number) => {
    deleteTagMutate(tagId)
  }

  return (
    <>
      <ScrollView>
        {tagData && editMode
          ? tagData?.map((tag) => (
              <>
                <TagListContainer key={tag.tagId}>
                  <Text>{tag.name}</Text>
                  <DeleteButton onPress={() => handleDelete(tag.tagId)}>
                    <ButtonText>{i18n.t('delete')}</ButtonText>
                  </DeleteButton>
                </TagListContainer>
                <GrayDivider />
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
    </>
  )
}
