import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import { defaultImages } from '@/assets'
import BottomSheet from '@/components/bottomSheet/BottomSheet'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import RadioButton from '@/components/buttons/radioButton/RadioButton'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import { LeftButtonHeader } from '@/components/header/leftButtonHeader/LeftButtonHeader'
import reportMenuConfig from '@/configs/reportMenuConfig.json'
import i18n from '@/locales'
import { ReportMenu } from '@/models/ReportMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, Menu, Title } from './Report.style'
import ReportBottomSheet from './components/reportBottomSheet/ReportBottomSheet'

interface ReportProps {
  navigation: MainNavigationProp
}

/**
 * Report
 */
const Report = ({ navigation }: ReportProps) => {
  const reportMenus = reportMenuConfig as ReportMenu[]
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          navigation={navigation}
          title={'신고하기'}
        />
      ),
    })
  })

  /**
   * 라디오 버튼 클릭 동작
   */
  const handleClickRadioButton = (id: string) => {
    setSelectedMenu(id)
    if (id === 'etc') {
      setIsVisibleBottomSheet(true)
    }
  }

  /**
   * 바텀싯 완료 버튼 클릭 동작
   */
  const handleCompleteBottomSheet = (text: string) => {
    // TODO: 서버로 text 전송
    setIsVisibleBottomSheet(false)
    submitReport(text)
  }

  /**
   * 신고 완료 버튼 클릭 동작
   */
  const onCompleteReport = () => {
    setIsDialogVisible(true)
    submitReport()
  }

  /**
   * 서버로 신고 정보를 전달
   */
  const submitReport = (text?: string) => {
    // TODO: 서버로 전송
    console.log('open submit')
  }

  return (
    <View>
      <Container>
        <Title>{i18n.t('selectReportReason')}</Title>
        <Menu>
          {reportMenus.map((menu) => (
            <RadioButton
              key={menu.id}
              id={menu.id}
              selected={menu.id === selectedMenu}
              message={menu.message}
              onClick={handleClickRadioButton}
            />
          ))}
        </Menu>
        <BoxButton
          textKey="complete"
          isDisabled={!selectedMenu}
          onPress={onCompleteReport}
        />
      </Container>
      <DefaultDialog
        isVisible={isDialogVisible}
        title="reportComplete"
        imageUrl={defaultImages.reportComplete}
        description="reviewReasonForReport"
        buttonText="backToCommunity"
        onClick={() => {
          setIsDialogVisible(false)
          navigation.navigate('BottomTab', { screen: 'Community' })
        }}
      />
      <BottomSheet
        isVisible={isVisibleBottomSheet}
        onModalHide={() => setIsDialogVisible(true)}
      >
        <ReportBottomSheet
          title="reportEtcDescription"
          onClick={handleCompleteBottomSheet}
        ></ReportBottomSheet>
      </BottomSheet>
    </View>
  )
}

export default Report
