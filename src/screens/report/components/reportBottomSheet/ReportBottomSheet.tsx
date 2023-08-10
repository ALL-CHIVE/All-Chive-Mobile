import React, { useState } from 'react'

import { ScrollView } from 'react-native'

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
      </ScrollView>
    </Container>
  )
}

export default ReportBottomSheet
