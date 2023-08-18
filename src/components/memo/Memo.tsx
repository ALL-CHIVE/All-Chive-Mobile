import React from 'react'

import { MemoContainer, MemoText } from './Memo.style'

interface Props {
  text: string
}

/**
 * Memo Component
 */
const Memo = ({ text }: Props) => {
  return (
    <MemoContainer>
      <MemoText>{text}</MemoText>
    </MemoContainer>
  )
}

export default Memo
