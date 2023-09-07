import { useState } from 'react'

/**
 *
 */
const useText = (checkValid: (text: string) => boolean) => {
  const [text, setText] = useState('')
  const [isValid, setIsValid] = useState(false)

  /**
   * text를 업데이트 합니다.
   */
  const updateText = (text: string) => {
    setText(text)
    setIsValid(checkValid(text))
  }

  /**
   * text를 초기화 합니다.
   */
  const clearText = () => {
    setText('')
    setIsValid(false)
  }

  return { text, isValid, updateText, clearText }
}

export default useText
