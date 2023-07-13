import React from 'react'

import i18n from '@/locales'

import { Container, Message, Radio, SelectedIcon, SelectedStyles } from './RadioButton.style'

interface RadioButtonProps {
  id: string
  selected: boolean
  message: string
  onClick: (id: string) => void
}

/**
 * RadioButton
 */
const RadioButton = ({ id, selected, message, onClick }: RadioButtonProps) => {
  return (
    <Container onPress={() => onClick(id)}>
      <Radio style={selected && SelectedStyles.radio}>{selected && <SelectedIcon />}</Radio>
      <Message>{i18n.t(message)}</Message>
    </Container>
  )
}

export default RadioButton
