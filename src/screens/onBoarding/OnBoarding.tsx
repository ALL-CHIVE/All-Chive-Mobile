import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Directions } from 'react-native-gesture-handler'

import FirstIndicator from '@/assets/icons/first-indicator.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { SwipeScreen } from '@/components/swipe/SwipeScreen'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, OnBoardingImage, Title } from './OnBoarding.style'
import { Pages } from './OnBoardingPages'

/**
 * OnBoarding
 */
const OnBoarding = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const [contentIndex, setContentIndex] = useState(0)

  /**
   * onClick
   */
  const onClick = () => {
    switch (contentIndex) {
      case 0:
        setContentIndex(1)
        break
      case 1:
        navigation.navigate('Login')
    }
  }

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <SwipeScreen
          direction={Directions.LEFT}
          wentToGo={onClick}
        >
          <Container>
            <OnBoardingImage
              source={Pages[contentIndex].image}
              style={{
                width: 222.3,
                height: 252,
              }}
            />
            <Title>{i18n.t(Pages[contentIndex].title)}</Title>
            <FirstIndicator />
          </Container>
        </SwipeScreen>
      </DefaultScrollContainer>
      <BoxButton
        textKey={Pages[contentIndex].buttonText}
        onPress={onClick}
      />
    </DefaultContainer>
  )
}

export default OnBoarding
