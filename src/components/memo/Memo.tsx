import React from 'react'

import { MemoContainer, MemoText, TextCounter } from './Memo.style'

interface Props {
  text: string
  maxLength: number
}

/**
 * Memo Component
 */
const Memo = ({ text, maxLength }: Props) => {
  return (
    <MemoContainer>
      <MemoText>{text}</MemoText>
      <TextCounter>
        {text.length}/{maxLength}
      </TextCounter>
    </MemoContainer>
  )
}

export default Memo
