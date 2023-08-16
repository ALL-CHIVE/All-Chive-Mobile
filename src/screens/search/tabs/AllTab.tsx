import React from 'react'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { SearchTabData } from '@/models/SearchTab'

import {
  TabArchivingCardContainer,
  TabItemContainer,
  SearchDataText,
  Title,
  ScrollContainer,
  TabHeader,
  WhiteDivider,
  Bottom,
} from './Tab.style'

/**
 * 전체 탭
 */
export const AllTab = ({ searchData }: SearchTabData) => {
  return (
    <ScrollContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <TabItemContainer>
        <TabHeader>
          <SearchDataText>
            {i18n.t('numberOfsearchResult', { number: searchData.archivings.content.length })}
          </SearchDataText>
          <Title>{i18n.t('myArchiving')}</Title>
        </TabHeader>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.archivings.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isSearch={true}
              />
            ))}
        </TabArchivingCardContainer>
      </TabItemContainer>
      <WhiteDivider />
      <TabItemContainer>
        <TabHeader>
          <SearchDataText>
            {i18n.t('numberOfsearchResult', { number: searchData.community.content.length })}
          </SearchDataText>
          <Title>{i18n.t('community')}</Title>
        </TabHeader>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.community.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isSearch={true}
              />
            ))}
        </TabArchivingCardContainer>
      </TabItemContainer>
      <Bottom />
    </ScrollContainer>
  )
}
