import React from 'react'

import { BoxButton } from '@/components/button/BoxButton'
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
      <OnBoardingImage source={require('@/assets/onboarding_2.png')} />
      <Title>{i18n.t('shareCategoryWithPeople')}</Title>
      <BoxButton
        textKey="next"
        onPress={() => {
          navigation.navigate('SelectSubject')
        }}
      />
    </Container>
  )
}

export default OnBoarding2
