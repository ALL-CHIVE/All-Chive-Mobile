import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Directions } from 'react-native-gesture-handler'

import { defaultImages } from '@/assets'
import FirstIndicator from '@/assets/icons/first-indicator.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { SwipeScreen } from '@/components/swipe/SwipeScreen'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, OnBoardingImage, Title } from './OnBoarding.style'

/**
 *
 */
const OnBoarding1 = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <SwipeScreen
          direction={Directions.LEFT}
          wentToGo={() => {
            navigation.navigate('OnBoarding2')
          }}
        >
          <Container>
            <OnBoardingImage
              source={defaultImages.onBoarding1}
              style={{ width: 222.3, height: 252 }}
            />
            <Title>{i18n.t('easilyManageContent')}</Title>
            <FirstIndicator />
          </Container>
        </SwipeScreen>
      </DefaultScrollContainer>
      <BoxButton
        textKey="next"
        onPress={() => {
          navigation.navigate('OnBoarding2')
        }}
      />
    </DefaultContainer>
  )
}

export default OnBoarding1
