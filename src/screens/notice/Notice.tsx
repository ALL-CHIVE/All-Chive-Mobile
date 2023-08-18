import React from 'react'

import { ScrollView } from 'react-native'

import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'

/**
 * 마이페이지 공지사항
 */
export const Notice = () => {
  // 현재는 공지사항이 없어 빈 화면으로 둡니다.
  return (
    <DefaultContainer>
      <LeftButtonHeader title={i18n.t('notice')} />
      <ScrollView bounces={false}>
        <EmptyItem textKey="emptyNotice" />
      </ScrollView>
    </DefaultContainer>
  )
}
