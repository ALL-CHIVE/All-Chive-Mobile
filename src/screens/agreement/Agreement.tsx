import React from 'react'

import { useNavigation } from '@react-navigation/native'

import CheckIcon from '@/assets/icons/check-default.svg'
import RightArrowIcon from '@/assets/icons/right-arrow.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import useAgreement from '@/hooks/useAgreement'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { openAgreementBrowser } from '@/services/OpenBrowserService'
import { colors } from '@/styles/colors'

import {
  AllAgreement,
  CheckBox,
  Container,
  Description,
  Divider,
  Heading,
  RightButton,
  RowView,
  Styles,
  Title,
} from './Agreement.style'

/**
 * 약관 동의 화면
 */
export const Agreement = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const { allCheck, agreements, toggleCheckBox, toggleAllCheckBox } = useAgreement()

  /**
   * SelectCategory 화면으로 이동합니다.
   */
  const handleComplete = () => {
    navigation.navigate('SelectCategory', {
      marketingAgreement: agreements.marketing,
    })
  }

  return (
    <DefaultContainer>
      <DefaultScrollContainer>
        <Container>
          <Heading>{i18n.t('agreementHeading')}</Heading>
          <AllAgreement onPress={toggleAllCheckBox}>
            <RowView disabled>
              <CheckBox>{allCheck && <CheckIcon style={Styles.checkIcon} />}</CheckBox>
              <Title>{i18n.t('allAgreement')}</Title>
            </RowView>
            <Description>{i18n.t('allAgreementDescription')}</Description>
          </AllAgreement>
          <Divider />
          {Object.entries(agreements).map(([key, value]) => (
            <RowView
              key={key}
              onPress={() => toggleCheckBox(key as keyof typeof agreements)}
            >
              <CheckBox>{value ? <CheckIcon style={Styles.checkIcon} /> : null}</CheckBox>
              <Title>{i18n.t(`${key}Agreement`)}</Title>
              <RightButton onPress={() => openAgreementBrowser(key)}>
                <RightArrowIcon color={colors.gray500} />
              </RightButton>
            </RowView>
          ))}
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
