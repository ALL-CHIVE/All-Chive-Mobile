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
}: TextInputProps) => {
  return (
    <Container>
      <InputBox
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={value}
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
