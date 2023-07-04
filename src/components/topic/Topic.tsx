import React, { useState } from 'react'

import { colors } from '@/styles/colors'

import { Container, Styles, Text } from './Topic.style'

interface TopicProps {
  text: string
  onPress: () => void
}

/**
 *
 */
export const Topic = ({ text, onPress }: TopicProps) => {
  const [isPressed, setIsPressed] = useState(false)

  /**
   *
   */
  const handlePressIn = () => {
    setIsPressed(true)
  }

  /**
   *
   */
  const handlePressOut = () => {
    setIsPressed(false)
  }

  return (
    <Container
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      underlayColor={colors.mainYellow}
    >
      <Text style={isPressed ? Styles.click : null}>{text}</Text>
    </Container>
  )
}
