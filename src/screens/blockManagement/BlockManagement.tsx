import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getBlockList } from '@/apis/block'
import { defaultImages } from '@/assets'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { ImageContainer, SubTitleText } from './BlockManagement.style'
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
          <ImageContainer>
            <Image source={defaultImages.emptyItem} />
            <SubTitleText>{i18n.t('noAuthorBlocked')}</SubTitleText>
          </ImageContainer>
        )}
      </ScrollView>
    </>
  )
}
