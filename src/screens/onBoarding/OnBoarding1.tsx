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
const OnBoarding1 = () => {
  const navigation = useNavigation<MainNavigationProp>()

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
