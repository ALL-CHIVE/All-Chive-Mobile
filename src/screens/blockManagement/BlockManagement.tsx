import React from 'react'

import { useQuery, useQueryClient } from 'react-query'

import { getBlockList } from '@/apis/block'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'

import { ScrollContainer } from './BlockManagement.style'
import { BlockList } from './components/BlockList'

/**
 *
 * 마이페이지 '차단 관리'
 */
export const BlockManagement = () => {
  const queryClient = useQueryClient()

  const {
    data: blockUserData,
    isLoading,
    isError,
  } = useQuery(['getBlockList'], () => getBlockList())

  return (
    <>
      {isLoading && <Loading />}
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['getBlockList'])
        }}
      />
      <DefaultContainer>
        <LeftButtonHeader title={i18n.t('blockManagement')} />
        <ScrollContainer
          bounces={false}
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
        </ScrollContainer>
      </DefaultContainer>
    </>
  )
}
