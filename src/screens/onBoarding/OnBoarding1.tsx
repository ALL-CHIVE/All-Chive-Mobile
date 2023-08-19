import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { defaultImages } from '@/assets'
import FirstIndicator from '@/assets/icons/firstIndicator.svg'
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
          <OnBoardingImage
            source={defaultImages.onBoarding1}
            style={{ width: 247, height: 280 }}
          />
          <Title>{i18n.t('easilyManageContent')}</Title>
          <FirstIndicator />
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
