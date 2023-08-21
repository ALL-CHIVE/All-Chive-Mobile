import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { defaultImages } from '@/assets'
import SecondIndicator from '@/assets/icons/secondIndicator.svg'
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
          <OnBoardingImage
            source={defaultImages.onBoarding2}
            style={{ width: 197.6, height: 237.6 }}
          />
          <Title>{i18n.t('shareCategoryWithPeople')}</Title>
          <SecondIndicator />
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
