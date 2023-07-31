import React from 'react'

import { ScrollView } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { SearchTabData } from '@/models/SearchTab'

import {
  SearchDataText,
  TabArchivingCardContainer,
  TabItemContainer,
  Title,
  WhiteDivider,
} from '../Search.style'

/**
 * 전체 탭
 */
export const AllTab = ({ searchData }: SearchTabData) => {
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
      <ScrollView>
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
          <WhiteDivider />
          <SearchDataText>
            {i18n.t('numberOfsearchResult', { number: searchData.community.content.length })}
          </SearchDataText>
          <Title>{i18n.t('community')}</Title>
          {searchData !== undefined &&
            searchData.community.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isMine={false}
              />
            ))}
        </TabArchivingCardContainer>
      </ScrollView>
    </TabItemContainer>
  )
}
