import React, { useState } from 'react'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import InputBox from '@/components/inputBox/InputBox'
import i18n from '@/locales'

import { Container, Title } from './ReportBottomSheet.style'

interface ReportBottomSheetProps {
  title: string
  onClick: (text: string) => void
}

/**
 * ReportBottomSheet
 */
const ReportBottomSheet = ({ title, onClick }: ReportBottomSheetProps) => {
  const [text, setText] = useState('')

  return (
    <Container>
      <Title>{i18n.t(title)}</Title>
      <InputBox
        maxLength={300}
        text={text}
        setText={setText}
      />
      <BoxButton
        textKey="complete"
        onPress={() => onClick(text)}
      />
    </Container>
  )
}

export default ReportBottomSheet
