import React, { useEffect, useState } from 'react'

import { Image, Keyboard, KeyboardEvent } from 'react-native'

import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import InputBox from '@/components/inputBox/InputBox'
import i18n from '@/locales'

import { CloseButton, Container, Header, ScrollContainer, Title } from './ReportBottomSheet.style'

interface ReportBottomSheetProps {
  title: string
  onClick: (text: string) => void
  onClose: () => void
}

/**
 * ReportBottomSheet
 */
const ReportBottomSheet = ({ title, onClick, onClose }: ReportBottomSheetProps) => {
  const [text, setText] = useState('')
  const [modalHight, setModalHeight] = useState(380)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  /**
   *
   */
  const keyboardDidShow = (event: KeyboardEvent) => {
    setModalHeight(event.endCoordinates.screenY - 10)
  }

  /**
   *
   */
  const keyboardDidHide = () => {
    setModalHeight(380)
  }

  return (
    <Container style={{ height: modalHight }}>
      <Header>
        <CloseButton onPress={onClose}>
          <Image source={defaultIcons.xMark} />
        </CloseButton>
      </Header>
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Title>{i18n.t(title)}</Title>
        <InputBox
          maxLength={300}
          text={text}
          setText={setText}
        />
      </ScrollContainer>
      <BoxButton
        textKey="complete"
        onPress={() => onClick(text)}
        isDisabled={!text}
      />
    </Container>
  )
}

export default ReportBottomSheet
