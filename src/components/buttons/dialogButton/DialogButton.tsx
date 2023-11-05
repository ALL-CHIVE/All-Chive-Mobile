import React from 'react'

import i18n from '@/locales'

import { Button, ButtonText } from './DialogButton.style'

interface DialogButtonProps {
  title: string
  onPress: () => void
  color: string
  backgroundColor: string
}

/**
 *
 */
const DialogButton = ({ title, onPress, color, backgroundColor }: DialogButtonProps) => {
  return (
    <Button
      style={{ backgroundColor }}
      onPress={onPress}
    >
      <ButtonText style={{ color }}>{i18n.t(title)}</ButtonText>
    </Button>
  )
}

export default DialogButton
