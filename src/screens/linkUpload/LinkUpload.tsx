import React, { useState } from 'react'

import { BoxButton } from '@/components/button/BoxButton'
import { CloseButtonHeader } from '@/components/header/closeButtonHeader/CloseButtonHeader'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Condition, Container, Styles, TextInput, Title } from './LinkUpload.style'

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

  const [contentFocus, setContentFocus] = useState(false)
  const [linkFocus, setLinkFocus] = useState(false)

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
  const handleClickButton = () => {
    // TODO: post link
  }

  return (
    <Container>
      <CloseButtonHeader
        navigation={navigation}
        title="업로드"
      />
      <Title>아카이빙 이름</Title>
      {/* dropdown link */}
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

      <BoxButton
        textKey="완료"
        onPress={handleClickButton}
        isDisabled={!archivingName || !contentName || !link}
      />
    </Container>
  )
}
