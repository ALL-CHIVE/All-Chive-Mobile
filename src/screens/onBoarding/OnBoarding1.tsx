import React from 'react'

import { defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import i18n from '@/locales'
import { ReportType } from '@/models/enums/ReportType'
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
          navigation.navigate('Report', { id: 123, type: ReportType.Archiving })
        }}
      />
    </Container>
  )
}

export default OnBoarding1
