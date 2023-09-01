import React, { useEffect, useState } from 'react'

import XMark from '@/assets/icons/x-mark.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import InputBox from '@/components/inputBox/InputBox'
import i18n from '@/locales'
import { keyboardListener } from '@/services/KeyboardService'
import { modalMaxHeight } from '@/services/SizeService'
import { colors } from '@/styles/colors'

import { CloseButton, Container, Header, ScrollContainer, Title } from './ReportBottomSheet.style'

interface ReportBottomSheetProps {
  title: string
  onClick: (text: string) => void
  onClose: () => void
}

const defaultModalHeight = 380

/**
 * ReportBottomSheet
 */
const ReportBottomSheet = ({ title, onClick, onClose }: ReportBottomSheetProps) => {
  const [text, setText] = useState('')
  const [modalHight, setModalHeight] = useState(defaultModalHeight)

  useEffect(() => keyboardListener(keyboardDidShow, keyboardDidHide), [])

  /**
   *
   */
  const keyboardDidShow = () => {
    const height = modalMaxHeight
    height && setModalHeight(height)
  }

  /**
   *
   */
  const keyboardDidHide = () => {
    setModalHeight(defaultModalHeight)
  }

  return (
    <Container style={{ height: modalHight }}>
      <Header>
        <CloseButton onPress={onClose}>
          <XMark color={colors.gray600} />
        </CloseButton>
      </Header>
      <ScrollContainer
        bounces={false}
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
