import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'

import { getBlockList } from '@/apis/block'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { BlockList } from './components/BlockList'

/**
 *
 * 마이페이지 '차단 관리'
 */
export const BlockManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const {
    data: blockUserData,
    isLoading,
    isError,
  } = useQuery(['getBlockList'], () => getBlockList())

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
      {isLoading && <Loading />}
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['getBlockList'])
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {blockUserData?.users && blockUserData.users.length > 0 ? (
          blockUserData.users.map((user) => (
            <BlockList
              key={user.id}
              nickname={user.nickname}
              id={user.id}
            />
          ))
        ) : (
          <EmptyItem textKey="noAuthorBlocked" />
        )}
      </ScrollView>
    </>
  )
}
