import { useEffect, useRef } from 'react'

import { TextInput } from 'react-native'

/**
 * useTextFocus
 */
const useTextFocus = () => {
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    setTimeout(() => inputRef?.current?.focus(), 20)
  }, [])

  return { inputRef }
}

export default useTextFocus
