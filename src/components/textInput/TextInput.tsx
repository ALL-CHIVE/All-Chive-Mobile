import React, { useEffect } from 'react'

import XMark from '@/assets/icons/x-mark.svg'
import useFocus from '@/hooks/useFocus'
import { colors } from '@/styles/colors'

import { ClearButton, Container, InputBox, Styles } from './TextInput.style'

interface TextInputProps {
  value: string
  placeholder: string
  maxLength: number | undefined
  onChangeText: (text: string) => void
  handleClear: () => void
  hasBorder?: boolean
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
  hasBorder,
}: TextInputProps) => {
  const { color, onFocus, onBlur } = useFocus()

  useEffect(() => {
    if (color === colors.gray200) {
      onBlur(value)
    }
  }, [value])

  /**
   *
   */
  const onClear = () => {
    onBlur('')
    handleClear()
  }

  return (
    <Container style={hasBorder && { ...Styles.border, borderColor: color }}>
      <InputBox
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        onChangeText={onChangeText}
        maxLength={maxLength}
        value={value}
        onFocus={hasBorder ? () => onFocus() : undefined}
        onBlur={hasBorder ? () => onBlur(value) : undefined}
      />
      {value && (
        <ClearButton onPress={onClear}>
          <XMark color={colors.gray600} />
        </ClearButton>
      )}
    </Container>
  )
}

export default TextInput
