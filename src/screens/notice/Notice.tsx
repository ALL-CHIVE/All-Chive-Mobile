import React from 'react'

import { ScrollView } from 'react-native'

import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { SwipeScreen } from '@/components/swipe/SwipeScreen'
import i18n from '@/locales'

/**
 * 마이페이지 공지사항 (현재는 공지사항이 없어 빈 화면으로 둡니다.)
 */
export const Notice = () => {
  return (
    <DefaultContainer>
      <LeftButtonHeader title={i18n.t('notice')} />
      <SwipeScreen direction={1}>
        <ScrollView bounces={false}>
          <EmptyItem
            textKey="emptyNotice"
            marginTop={120}
          />
        </ScrollView>
      </SwipeScreen>
    </DefaultContainer>
  )
}
