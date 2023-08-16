import React from 'react'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { SearchTabData } from '@/models/SearchTab'

import {
  TabArchivingCardContainer,
  ScrollContainer,
  TabItemContainer,
  TabHeader,
  SearchDataText,
  Title,
  Bottom,
} from './Tab.style'

/**
 * 내 아카이빙만 보여주는 탭
 */
export const ArchivingTab = ({ searchData }: SearchTabData) => {
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
          {searchData &&
            searchData.archivings.content.map((item) => (
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
