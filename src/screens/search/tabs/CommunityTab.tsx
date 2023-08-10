import React from 'react'

import { ScrollView } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { SearchTabData } from '@/models/SearchTab'

import { SearchDataText, TabArchivingCardContainer, TabItemContainer, Title } from '../Search.style'

/**
 * 커뮤니티 모두 보여주는 탭
 */
export const CommunityTab = ({ searchData }: SearchTabData) => {
  return (
    <TabItemContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SearchDataText>
          {i18n.t('numberOfsearchResult', { number: searchData.community.content.length })}
        </SearchDataText>
        <Title>{i18n.t('community')}</Title>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.community.content.map((item) => (
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
