import React, { useState } from 'react'

import { View } from 'react-native'
import { useRecoilState } from 'recoil'

import i18n from '@/locales'
import { subjectState } from '@/state/subjectState'

import { Container, Styles, Text } from './Subject.style'

interface SubjectProps {
  options: string[]
  onPress: (value: string) => void
}

/**
 *
 */
export const Subject = ({ options, onPress }: SubjectProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [, setCurrentSubjectState] = useRecoilState(subjectState)

  /**
   *
   */
  const handleOptionPress = (option: string) => {
    setSelectedOption(option)
    onPress(option)
    setCurrentSubjectState(option)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((option, index) => (
        <Container
          key={index}
          onPress={() => handleOptionPress(option)}
          style={selectedOption === option ? Styles.click : null}
        >
          <Text style={selectedOption === option ? Styles.click : null}>{i18n.t(option)}</Text>
        </Container>
      ))}
    </View>
  )
}
