import React, { useState } from 'react'

import { View } from 'react-native'
import { useRecoilState } from 'recoil'

import { topicState } from '@/state/topicState'

import { Container, Styles, Text } from './Topic.style'

interface TopicProps {
  options: string[]
  onPress: (value: string) => void
}

/**
 *
 */
export const Topic = ({ options, onPress }: TopicProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [, setCurrentTopicState] = useRecoilState(topicState)

  /**
   *
   */
  const handleOptionPress = (option: string) => {
    setSelectedOption(option)
    onPress(option)
    setCurrentTopicState(option)
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {options.map((option, index) => (
        <Container
          key={index}
          onPress={() => handleOptionPress(option)}
          style={selectedOption === option ? Styles.click : null}
        >
          <Text style={selectedOption === option ? Styles.click : null}>{option}</Text>
        </Container>
      ))}
    </View>
  )
}
