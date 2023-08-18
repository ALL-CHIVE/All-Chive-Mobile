import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'

import { defaultIcons, defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, OnBoardingImage, Title } from './OnBoarding.style'

/**
 *
 */
const OnBoarding2 = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <Container>
          <OnBoardingImage source={defaultImages.onBoarding2} />
          <Title>{i18n.t('shareCategoryWithPeople')}</Title>
          <Image source={defaultIcons.secondIndicator} />
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey="complete"
        onPress={() => {
          navigation.navigate('Login')
        }}
      />
    </DefaultContainer>
  )
}

export default OnBoarding2
