import React, { useEffect, useState } from 'react'

import { View, Text } from 'react-native'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import RadioButton from '@/components/buttons/radioButton/RadioButton'
import DefaultHeader from '@/components/defaultHeader/DefaultHeader'
import reportMenuConfig from '@/configs/reportMenuConfig.json'
import i18n from '@/locales'
import { ReportMenu } from '@/models/ReportMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, Menu, Title } from './Report.style'

interface ReportProps {
  navigation: MainNavigationProp
}

/**
 *
 */
const Report = ({ navigation }: ReportProps) => {
  const reportMenus = reportMenuConfig as ReportMenu[]
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)

  useEffect(() => {
    navigation.setOptions({
      /**
       *
       */
      header: ({ options }) => (
        <DefaultHeader
          navigation={navigation}
          title={'신고하기'}
          PopupMenuList={[]}
          options={options}
        />
      ),
    })
  })

  /**
   *
   */
  const clickRadioButton = (id: string) => {
    setSelectedMenu(id)

    if (id === 'etc') {
      // openbottom sheet
    }
  }

  /**
   *
   */
  const submitReport = () => {
    // TODO: 서버로 전송
  }

  return (
    <Container>
      <Title>{i18n.t('selectReportReason')}</Title>
      <Menu>
        {reportMenus.map((menu) => (
          <RadioButton
            key={menu.id}
            id={menu.id}
            selected={menu.id === selectedMenu}
            message={menu.message}
            onClick={clickRadioButton}
          />
        ))}
      </Menu>
      <BoxButton
        textKey="complete"
        isDisabled={!selectedMenu}
        onPress={submitReport}
      />
    </Container>
  )
}

export default Report
