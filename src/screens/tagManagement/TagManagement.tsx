import React, { useState } from 'react'

import { Directions } from 'react-native-gesture-handler'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { getTag, postTag } from '@/apis/tag/Tag'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import { InputDialog } from '@/components/dialogs/inputDialog/InputDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import { SwipeScreen } from '@/components/swipe/SwipeScreen'
import useText from '@/hooks/useText'
import i18n from '@/locales'
import { checkTag } from '@/services/StringChecker'

import { ButtonText, PlusButton, ScrollContainer } from './TagManagement.style'
import { TagList } from './components/TagList'

/**
 * 마이페이지 '태그 관리'
 */
export const TagManagement = () => {
  const queryClient = useQueryClient()

  const [editMode, setEditMode] = useState(false)
  const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)
  const {
    text: tag,
    isValid: isTagValid,
    updateText: updateTag,
    clearText: clearTag,
  } = useText(checkTag)

  const { data: tagData, isLoading } = useQuery(['getTagData'], () => getTag(false), {
    /**
     *
     */
    onError: () => {
      setErrorDialogVisible(true)
    },
  })

  const { mutate: postTagMutate } = useMutation(postTag, {
    /**
     * postTag 성공 시 input 내 text를 초기화하고, getTagData를 리패치합니다.
     */
    onSuccess: () => {
      clearTag()
      queryClient.invalidateQueries('getTagData')
    },
  })

  /**
   * 새로운 태그를 생성합니다.
   */
  const handleCreate = () => {
    postTagMutate(tag)
  }

  return (
    <>
      {isLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries(['getTagData'])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      <DefaultContainer>
        <LeftButtonHeader
          title={i18n.t('tagManagement')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={() => setEditMode((prev) => !prev)}
        />
        <SwipeScreen direction={Directions.RIGHT}>
          <ScrollContainer
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {tagData &&
              tagData.map((tag) => (
                <TagList
                  key={tag.tagId}
                  id={tag.tagId}
                  tag={tag.name}
                  editMode={editMode}
                />
              ))}
            <PlusButton onPress={() => setIsCreateDialogVisible(true)}>
              <ButtonText>{`+ ${i18n.t('addTag')}`}</ButtonText>
            </PlusButton>
          </ScrollContainer>
        </SwipeScreen>

        <InputDialog
          isVisible={isCreateDialogVisible}
          title="createNewTag"
          text={tag}
          setText={updateTag}
          completeText="register"
          onCancel={() => {
            setIsCreateDialogVisible(false)
          }}
          onComplete={() => {
            setIsCreateDialogVisible(false)
            handleCreate()
          }}
          isDisabled={tag.length === 0 || !isTagValid}
          placeholder={i18n.t('placeHolderTag')}
          isValid={isTagValid}
        />
      </DefaultContainer>
    </>
  )
}
