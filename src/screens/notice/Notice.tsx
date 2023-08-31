import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler'

import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

/**
 * 마이페이지 공지사항 (현재는 공지사항이 없어 빈 화면으로 둡니다.)
 */
export const Notice = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <DefaultContainer>
      <LeftButtonHeader title={i18n.t('notice')} />
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.ACTIVE) {
            navigation.goBack()
          }
        }}
      >
        <ScrollView bounces={false}>
          <EmptyItem
            textKey="emptyNotice"
            marginTop={120}
          />
        </ScrollView>
      </FlingGestureHandler>
    </DefaultContainer>
  )
}
