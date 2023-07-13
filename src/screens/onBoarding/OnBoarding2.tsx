import React from 'react'

import { defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, OnBoardingImage, Title } from './OnBoarding.style'

interface OnBoardingProps {
  navigation: MainNavigationProp
}

/**
 *
 */
const OnBoarding2 = ({ navigation }: OnBoardingProps) => {
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
