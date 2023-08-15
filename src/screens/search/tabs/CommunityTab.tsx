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
  Bottom,
} from './Tab.style'

/**
 * 커뮤니티 모두 보여주는 탭
 */
export const CommunityTab = ({ searchData }: SearchTabData) => {
  return (
    <ScrollContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
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
              />
            ))}
        </TabArchivingCardContainer>
      </TabItemContainer>
      <Bottom />
    </ScrollContainer>
  )
}
