import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getBlockList } from '@/apis/block'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { BlockList } from './components/BlockList'

/**
 *
 * 마이페이지 '차단 관리'
 */
export const BlockManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const { data: blockUserData } = useQuery(['getBlockList'], () => getBlockList())

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => <LeftButtonHeader title={i18n.t('blockManagement')} />,
    })
  })

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {blockUserData?.users && blockUserData.users.length > 0 ? (
          blockUserData.users.map((user) => (
            <>
              <BlockList
                nickname={user.nickname}
                id={user.id}
              />
            </>
          ))
        ) : (
          <EmptyItem textKey="noAuthorBlocked" />
        )}
      </ScrollView>
    </>
  )
}
