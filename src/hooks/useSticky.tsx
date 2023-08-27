import { useState } from 'react'

import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

/**
 * useSticky
 */
const useSticky = (targetOffset: number) => {
  const [isSticky, setIsSticky] = useState(false)

  /**
   * 스크롤을 감지합니다.
   */
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y

    if (offsetY > targetOffset) {
      setIsSticky(true)
    } else {
      setIsSticky(false)
    }
  }

  return { isSticky, handleScroll }
}

export default useSticky
