import React from 'react'

import { ScrollView } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { SearchTabData } from '@/models/SearchTab'

import { SearchDataText, TabArchivingCardContainer, TabItemContainer, Title } from '../Search.style'

/**
 * 내 아카이빙만 보여주는 탭
 */
export const ArchivingTab = ({ searchData }: SearchTabData) => {
  /**
   *
   */
  const HandleFix = () => {
    // TODO: 아카이빙 고정 연결
  }

  /**
   *
   */
  const HandleRemove = () => {
    // TODO: 아카이빙 삭제 연결
  }

  return (
    <TabItemContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SearchDataText>
          {i18n.t('numberOfsearchResult', { number: searchData.archivings.content.length })}
        </SearchDataText>
        <Title>{i18n.t('myArchiving')}</Title>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.archivings.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isMine={true}
              />
            ))}
        </TabArchivingCardContainer>
      </ScrollView>
    </TabItemContainer>
  )
}
