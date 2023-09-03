import React from 'react'

import XMark from '@/assets/icons/x-mark.svg'
import { colors } from '@/styles/colors'

import { ClearButton, Container, InputBox } from './TextInput.style'

interface TextInputProps {
  value: string
  placeholder: string
  maxLength: number | undefined
  onChangeText: (text: string) => void
  handleClear: () => void
  onFocus?: () => void
  onBlur?: (text: string) => void
}

/**
 *
 */
const TextInput = ({
  value,
  placeholder,
  maxLength,
  onChangeText,
  handleClear,
  onFocus,
  onBlur,
}: TextInputProps) => {
  return (
    <Container>
      <InputBox
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={value}
        onFocus={onFocus}
        onBlur={() => onBlur && onBlur(value)}
      />
      {value && (
        <ClearButton onPress={handleClear}>
          <XMark color={colors.gray600} />
        </ClearButton>
      )}
    </Container>
  )
}

export default TextInput
