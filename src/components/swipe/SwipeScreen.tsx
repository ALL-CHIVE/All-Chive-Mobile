import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'

import { MainNavigationProp } from '@/navigations/MainNavigator'

interface SwipeScreenProps {
  children: React.ReactNode
  direction: Directions
  wentToGo?: () => void
}

/**
 * 스크린 스와이프 제스처
 */
export const SwipeScreen = ({ children, direction, wentToGo }: SwipeScreenProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <FlingGestureHandler
      direction={direction}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.ACTIVE) {
          if (wentToGo) {
            wentToGo()
          } else {
            navigation.goBack()
          }
        }
      }}
    >
      {children}
    </FlingGestureHandler>
  )
}
