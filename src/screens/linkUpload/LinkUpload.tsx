import React, { useState } from 'react'

import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { BoxButton } from '@/components/button/BoxButton'
import { CloseButtonHeader } from '@/components/header/closeButtonHeader/CloseButtonHeader'
import { ArchivingModal } from '@/components/modal/archivingModal/ArchivingModal'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'

import { ArchivingSelect, Condition, Container, Styles, TextInput, Title } from './LinkUpload.style'

interface LinkUploadProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const LinkUpload = ({ navigation }: LinkUploadProps) => {
  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [link, setLink] = useState('')
  const [memo, setMemo] = useState('')

  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [contentFocus, setContentFocus] = useState(false)
  const [linkFocus, setLinkFocus] = useState(false)
  const [memoFocus, setMemoFocus] = useState(false)

  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)

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
        title="업로드"
        onClose={() => navigation.navigate('BottomTab')}
      />
      <Title>아카이빙 이름</Title>
      <ArchivingSelect onPress={() => setOpenArchivingModal(true)}>
        {archivingName ? <Text>{archivingName}</Text> : <Text>아카이빙을 선택하세요</Text>}
        {/* TODO: 오른쪽 화살표 아이콘 추가 */}
      </ArchivingSelect>
      <ArchivingModal
        onClose={handleCloseModal}
        isVisible={openArchivingModal}
      />
      <Title>컨텐츠 이름</Title>
      <TextInput
        placeholder="한/영/특수문자 15자 이내로 입력하세요"
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
        한/영/특수문자 15자 이내로 입력하세요
      </Condition>
      <Title>링크</Title>
      <TextInput
        placeholder="링크를 입력하세요"
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
      <Condition>올바른 url 주소</Condition>
      <View style={{ flexDirection: 'row' }}>
        <Title>태그</Title>
        <Text>선택사항 (최대 10개)</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Tag')}>
        <Text>+ 태그 추가</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Title>메모</Title>
        <Text>선택사항</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={160}
      >
        <TextInput
          placeholder="메모를 입력하세요"
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
        textKey="완료"
        onPress={handlesubmit}
        isDisabled={!archivingName || !contentName || !link}
      />
    </Container>
  )
}
