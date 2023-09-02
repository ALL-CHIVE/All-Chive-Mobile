import React from 'react'

import { Container, Text } from './WhiteTag.style'

interface WhiteTagProps {
  tag: string
}

/**
 * WhiteTag Components
 */
export const WhiteTag = ({ tag }: WhiteTagProps) => {
  /**
   * 태그 글자수가 7자 이상이면 7자까지만 표시하고 뒤에 ...을 붙입니다.
   */
  const sliceText = (text: string) => {
    if (text.length > 7) {
      return `${text.slice(0, 7)} ...`
    }
    return text
  }

  return (
    <Container>
      <Text>{sliceText(tag)}</Text>
    </Container>
  )
}
