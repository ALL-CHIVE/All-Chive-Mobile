import React, { useState } from 'react'

import { View } from 'react-native'

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
  const [borderColor, setBorderColor] = useState(colors.gray200)

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
        onFocus={() => setBorderColor(colors.yellow500)}
        onBlur={() => setBorderColor(text ? colors.gray500 : colors.gray200)}
        style={{ minHeight: minHeight, borderColor: borderColor }}
      />
      <TextCounter>
        {text.length}/{maxLength}
      </TextCounter>
    </View>
  )
}

export default InputBox
