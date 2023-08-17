import React from 'react'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import i18n from '@/locales'
import { SearchResponse } from '@/models/Search'

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
export const CommunityTab = ({ data }: SearchResponse) => {
  return (
    <ScrollContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {data.community.content.length === 0 ? (
        <EmptyItem textKey={i18n.t('emptySearch')} />
      ) : (
        <>
          <TabItemContainer>
            <TabHeader>
              <SearchDataText>
                {i18n.t('numberOfsearchResult', { number: data.community.content.length })}
              </SearchDataText>
              <Title>{i18n.t('community')}</Title>
            </TabHeader>
            <TabArchivingCardContainer>
              {data !== undefined &&
                data.community.content.map((item) => (
                  <ArchivingCard
                    key={item.archivingId}
                    item={item}
                    isSearch={true}
                  />
                ))}
            </TabArchivingCardContainer>
          </TabItemContainer>
          <Bottom />
        </>
      )}
    </ScrollContainer>
  )
}
