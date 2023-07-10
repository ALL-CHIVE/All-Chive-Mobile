import React from 'react'

import { defaultImages } from '@/assets'
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
const OnBoarding1 = ({ navigation }: OnBoardingProps) => {
  return (
    <Container>
      <OnBoardingImage source={defaultImages.onBoarding1} />
      <Title>{i18n.t('easilyManageContent')}</Title>
      <BoxButton
        textKey="next"
        onPress={() => {
          navigation.navigate('OnBoarding2')
        }}
      />
    </Container>
  )
}

export default OnBoarding1
