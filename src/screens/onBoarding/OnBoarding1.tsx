import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, SafeAreaView, ScrollView, View } from 'react-native'

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
const OnBoarding1 = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <Container>
          <OnBoardingImage source={defaultImages.onBoarding1} />
          <Title>{i18n.t('easilyManageContent')}</Title>
          <Image source={defaultIcons.firstIndicator} />
        </Container>
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
