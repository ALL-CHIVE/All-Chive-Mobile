import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { defaultImages } from '@/assets'
import BottomSheet from '@/components/bottomSheet/BottomSheet'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import RadioButton from '@/components/buttons/radioButton/RadioButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import reportMenuConfig from '@/configs/reportMenuConfig.json'
import i18n from '@/locales'
import { ReportMenu } from '@/models/ReportMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, Menu, Title } from './Report.style'
import ReportBottomSheet from './components/reportBottomSheet/ReportBottomSheet'

/**
 * Report
 */
const Report = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const reportMenus = reportMenuConfig as ReportMenu[]
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null)
  const [isVisibleBottomSheet, setIsVisibleBottomSheet] = useState(false)
  const [isDialogVisible, setIsDialogVisible] = useState(false)

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
    <DefaultContainer>
      <LeftButtonHeader title={i18n.t('report')} />
      <DefaultScrollContainer>
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
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey="complete"
        isDisabled={!selectedMenu}
        onPress={onCompleteReport}
      />
      <BottomSheet
        isVisible={isVisibleBottomSheet}
        onBackdropPress={() => setIsVisibleBottomSheet(false)}
        onModalHide={() => undefined}
      >
        <ReportBottomSheet
          title="reportEtcDescription"
          onClick={(text: string) => {
            handleCompleteBottomSheet(text)
            setIsDialogVisible(true)
          }}
        />
      </BottomSheet>
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
    </DefaultContainer>
  )
}

export default Report
