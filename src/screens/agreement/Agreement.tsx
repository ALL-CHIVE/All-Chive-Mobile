import React, { useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'

import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'

import {
  CheckBox,
  Container,
  Description,
  Divider,
  Heading,
  RowView,
  Title,
  YellowCheckImage,
} from './Agreement.style'

interface AgreementProps {
  route: RouteProp<RootStackParamList, 'Agreement'>
}

/**
 * 약관 동의 화면
 */
export const Agreement = ({ route }: AgreementProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  const [allCheck, setAllCheck] = useState(false)

  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false,
  })

  /**
   * 체크박스를 컨트롤합니다.
   */
  const handleCheckboxChange = (key: keyof typeof agreements) => {
    setAgreements((prevAgreements) => ({
      ...prevAgreements,
      [key]: !prevAgreements[key],
    }))
  }

  /**
   * 모든 체크박스를 활성화 or 비활성화 합니다.
   */
  const handleAllCheck = () => {
    if (allCheck) {
      setAllCheck(false)
      setAgreements({
        terms: false,
        privacy: false,
        marketing: false,
      })
    } else {
      setAllCheck(true)
      setAgreements({
        terms: true,
        privacy: true,
        marketing: true,
      })
    }
  }

  /**
   * SelectCategory 화면으로 이동합니다.
   */
  const handleComplete = () => {
    navigation.navigate('SelectCategory', { type: route.params.type })
  }

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <Container>
          <Heading>{i18n.t('agreementHeading')}</Heading>
          <RowView>
            <CheckBox onPress={handleAllCheck}>
              {allCheck ? <YellowCheckImage source={defaultIcons.yellowCheck} /> : null}
            </CheckBox>
            <Title>{i18n.t('allAgreement')}</Title>
          </RowView>
          <Description>{i18n.t('allAgreementDescription')}</Description>
          <Divider />
          {Object.entries(agreements).map(([key, value]) => {
            if (key !== 'all') {
              return (
                <RowView key={key}>
                  <CheckBox onPress={() => handleCheckboxChange(key as keyof typeof agreements)}>
                    {value ? <YellowCheckImage source={defaultIcons.yellowCheck} /> : null}
                  </CheckBox>
                  <Title>{i18n.t(`${key}Agreement`)}</Title>
                </RowView>
              )
            }
          })}
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey="complete"
        onPress={handleComplete}
        isDisabled={!agreements.terms || !agreements.privacy}
      />
    </DefaultContainer>
  )
}
