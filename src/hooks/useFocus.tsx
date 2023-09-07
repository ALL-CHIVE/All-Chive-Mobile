import { useState } from 'react'

import { colors } from '@/styles/colors'

/**
 * focus에 따른 색상 여부 전달
 */
const useFocus = () => {
  const [color, setColor] = useState(colors.gray200)

  /**
   * Focus 처리합니다.
   */
  const onFocus = () => {
    setColor(colors.yellow500)
  }

  /**
   * Blur 처리 합니다.
   */
  const onBlur = (text: string) => {
    setColor(text ? colors.gray500 : colors.gray200)
  }

  return { color, onFocus, onBlur }
}

export default useFocus
