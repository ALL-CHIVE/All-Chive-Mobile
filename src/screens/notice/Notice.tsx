import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

/**
 * 마이페이지 공지사항
 */
export const Notice = () => {
  const navigation = useNavigation<MainNavigationProp>()

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => <LeftButtonHeader title={i18n.t('notice')} />,
    })
  })

  // 현재는 공지사항이 없어 빈 화면으로 둡니다.
  return (
    <>
      <ScrollView bounces={false}>
        <EmptyItem textKey="emptyNotice" />
      </ScrollView>
    </>
  )
}
