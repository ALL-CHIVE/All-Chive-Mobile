import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native'
import { useMutation } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SelectArchivingModal } from '@/components/modal/selectArchivingModal/SelectArchivingModal'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'
import { SelectTagState } from '@/state/upload/SelectTagState'

import {
  AddTagButton,
  AddTagText,
  ArchivingSelect,
  Condition,
  Container,
  RowView,
  Styles,
  TextInput,
  Title,
} from '../Upload.style'
import { postContents } from '../apis/postContents'

/**
 *
 */
export const LinkUpload = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [link, setLink] = useState('')
  const [memo, setMemo] = useState('')

  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [contentFocus, setContentFocus] = useState(false)
  const [linkFocus, setLinkFocus] = useState(false)
  const [memoFocus, setMemoFocus] = useState(false)

  const selectArchiving = useRecoilValue(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)

  const { mutate } = useMutation(() =>
    postContents({
      contentType: 'link',
      archivingId: 0,
      title: contentName,
      link: link,
      tagIds: [],
      memo: memo,
    })
  )

  /**
   *
   */
  const handleCloseModal = () => {
    setOpenArchivingModal(false)
    setArchivingName(selectArchiving)
  }

  /**
   *
   */
  const handleContentFocus = () => {
    setContentFocus(true)
  }

  /**
   *
   */
  const handleContentBlur = () => {
    setContentFocus(false)
  }

  /**
   *
   */
  const handleLinkFocus = () => {
    setLinkFocus(true)
  }

  /**
   *
   */
  const handleLinkBlur = () => {
    setLinkFocus(false)
  }

  /**
   *
   */
  const handleMemoFocus = () => {
    setMemoFocus(true)
  }

  /**
   *
   */
  const handleMemoBlur = () => {
    setMemoFocus(false)
  }

  /**
   *
   */
  const handlesubmit = () => {
    // TODO
  }

  return (
    <Container>
      <CloseButtonHeader
        title={i18n.t('upload')}
        onClose={() => navigation.navigate('BottomTab', { screen: 'Home' })}
      />
      <Title>{i18n.t('archivingName')}</Title>
      <ArchivingSelect onPress={() => setOpenArchivingModal(true)}>
        {archivingName ? <Text>{archivingName}</Text> : <Text>{i18n.t('choiceArchiving')}</Text>}
        {/* TODO: 오른쪽 화살표 아이콘 추가 */}
      </ArchivingSelect>
      <SelectArchivingModal
        onClose={handleCloseModal}
        isVisible={openArchivingModal}
      />
      <Title>{i18n.t('contentName')}</Title>
      <TextInput
        placeholder={i18n.t('contentVerify')}
        value={contentName}
        onChangeText={setContentName}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        maxLength={15}
        style={[
          contentFocus ? Styles.inputFocus : null,
          !contentFocus && contentName.length > 0 ? Styles.inputWithValue : null,
        ]}
      />
      {/* TODO: Condition Icon 추가 */}
      <Condition style={[contentName.length > 0 ? Styles.conditionComplete : null]}>
        {i18n.t('contentVerify')}
      </Condition>
      <Title>{i18n.t('link')}</Title>
      <TextInput
        placeholder={i18n.t('placeHolderLink')}
        value={link}
        onChangeText={setLink}
        onFocus={handleLinkFocus}
        onBlur={handleLinkBlur}
        style={[
          linkFocus ? Styles.inputFocus : null,
          !linkFocus && link.length > 0 ? Styles.inputWithValue : null,
        ]}
      />
      {/* TODO: Condition Icon 추가 */}
      <Condition>{i18n.t('checkUrl')}</Condition>
      <RowView>
        <Title>{i18n.t('tag')}</Title>
        <Text>{i18n.t('choice10')}</Text>
      </RowView>
      <RowView>
        <ScrollView horizontal={true}>
          <AddTagButton onPress={() => navigation.navigate('CreateTag')}>
            <AddTagText>{`+ ${i18n.t('addTag')}`}</AddTagText>
          </AddTagButton>
          {selectTag &&
            selectTag.map((tag) => (
              <GrayTag
                key={tag}
                tag={tag}
                onRemove={() => {
                  setSelectTag(selectTag.filter((item) => item !== tag))
                }}
              />
            ))}
        </ScrollView>
      </RowView>
      <RowView>
        <Title>{i18n.t('memo')}</Title>
        <Text>{i18n.t('choice')}</Text>
      </RowView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={160}
      >
        <TextInput
          placeholder={i18n.t('placeHolderMemo')}
          value={memo}
          onChangeText={setMemo}
          onFocus={handleMemoFocus}
          onBlur={handleMemoBlur}
          maxLength={150}
          multiline
          style={[
            memoFocus ? Styles.inputFocus : null,
            !memoFocus && memo.length > 0 ? Styles.inputWithValue : null,
          ]}
        />
      </KeyboardAvoidingView>
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handlesubmit}
        isDisabled={!archivingName || !contentName || !link}
      />
    </Container>
  )
}
