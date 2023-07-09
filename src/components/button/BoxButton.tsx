import React from 'react'

import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { BoxButtonContainer, BoxButtonStyles, BoxButtonText } from './BoxButton.style'

interface BoxButtonProps {
  textKey: string
  onPress: () => void
  isDisabled?: boolean
}
/**
 *
 */
export const BoxButton = ({ textKey, onPress, isDisabled }: BoxButtonProps) => {
  return (
    <BoxButtonContainer
      style={isDisabled ? BoxButtonStyles.disabled : null}
      onPress={onPress}
      disabled={isDisabled}
      underlayColor={colors.yellow500}
    >
      <BoxButtonText style={isDisabled ? BoxButtonStyles.disabled : null}>
        {i18n.t(textKey)}
      </BoxButtonText>
    </BoxButtonContainer>
  )
}
