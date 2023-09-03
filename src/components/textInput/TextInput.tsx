import React from 'react'

import XMark from '@/assets/icons/x-mark.svg'
import { colors } from '@/styles/colors'

import { ClearButton, InputBox } from './TextInput.style'

interface TextInputProps {
  value: string
  placeholder: string
  maxLength: number
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
    <>
      <InputBox
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={value}
      />
      <ClearButton
        onPress={handleClear}
        disabled={!value}
      >
        <XMark color={colors.gray600} />
      </ClearButton>
    </>
  )
}

export default TextInput
