import React, { useState } from 'react'

import { Image } from 'react-native'

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

  return (
    <Container>
      <Header>
        <CloseButton onPress={onClose}>
          <Image source={defaultIcons.grayCloseButton} />
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
