import React from 'react'

import { View } from 'react-native'

import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { TextBox, TextCounter } from './InputBox.style'

interface InputBoxProps {
  maxLength: number
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

/**
 * InputBox
 */
const InputBox = ({ maxLength, text, setText }: InputBoxProps) => {
  return (
    <View>
      <TextBox
        maxLength={maxLength}
        value={text}
        onChangeText={setText}
        multiline={true}
        placeholder={i18n.t('placeholder')}
        textAlignVertical={'top'}
        placeholderTextColor={colors.gray200}
      />
      <TextCounter>
        {text.length}/{maxLength}
      </TextCounter>
    </View>
  )
}

export default InputBox
