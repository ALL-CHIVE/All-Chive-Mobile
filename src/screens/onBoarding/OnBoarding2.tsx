import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, OnBoardingImage, Title } from './OnBoarding.style'

/**
 *
 */
const OnBoarding2 = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container>
      <OnBoardingImage source={defaultImages.onBoarding2} />
      <Title>{i18n.t('shareCategoryWithPeople')}</Title>
      <BoxButton
        textKey="complete"
        onPress={() => {
          navigation.navigate('Login')
        }}
      />
    </Container>
  )
}

export default OnBoarding2
