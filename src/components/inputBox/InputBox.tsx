import React, { useEffect } from 'react'

import { View } from 'react-native'

import useFocus from '@/hooks/useFocus'
import { colors } from '@/styles/colors'

import { TextBox, TextCounter } from './InputBox.style'

interface InputBoxProps {
  placeholder: string
  maxLength: number
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  minHeight: number
}

/**
 * InputBox
 */
const InputBox = ({ placeholder, maxLength, text, setText, minHeight }: InputBoxProps) => {
  const { color, onFocus, onBlur } = useFocus()

  useEffect(() => {
    if (color === colors.gray200) {
      onBlur(text)
    }
  }, [text])

  return (
    <View>
      <TextBox
        maxLength={maxLength}
        value={text}
        onChangeText={setText}
        multiline={true}
        placeholder={placeholder}
        textAlignVertical={'top'}
        placeholderTextColor={colors.gray200}
        onFocus={onFocus}
        onBlur={() => onBlur(text)}
        style={{ minHeight, borderColor: color }}
      />
      <TextCounter>
        {text.length}/{maxLength}
      </TextCounter>
    </View>
  )
}

export default InputBox
