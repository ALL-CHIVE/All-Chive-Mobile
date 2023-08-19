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
  WhiteDivider,
  Bottom,
} from './Tab.style'

/**
 * 전체 탭
 */
export const AllTab = ({ data }: SearchResponse) => {
  return (
    <ScrollContainer
      bounces={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {data.archivings.content.length === 0 && data.community.content.length === 0 ? (
        <EmptyItem textKey={i18n.t('emptySearch')} />
      ) : (
        <>
          <TabItemContainer>
            <TabHeader>
              <SearchDataText>
                {i18n.t('numberOfsearchResult', { number: data.archivings.totalElements })}
              </SearchDataText>
              <Title>{i18n.t('myArchiving')}</Title>
            </TabHeader>
            <TabArchivingCardContainer>
              {data !== undefined &&
                data.archivings.content.map((item) => (
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
                {i18n.t('numberOfsearchResult', { number: data.community.totalElements })}
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
