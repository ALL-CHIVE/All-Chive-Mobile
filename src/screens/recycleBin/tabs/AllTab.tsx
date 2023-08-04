import React from 'react'

import { ListRenderItem, ScrollView } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'
import { SimpleContent } from '@/models/SimpleContent'

import {
  Container,
  ContentListContainer,
  GrayDivider,
  SearchDataText,
  TabItemCardContainer,
  TabItemContainer,
  Title,
} from '../RecycleBin.style'

/**
 * 전체 탭
 */
export const AllTab = ({ contents, archivings }: RecyclesResponse) => {
  return (
    <Container>
      <ScrollView>
        <TabItemContainer>
          <SearchDataText>
            {i18n.t('numberOfRecycleItem', { number: archivings.length })}
          </SearchDataText>
          <Title>{i18n.t('archiving')}</Title>
          <TabItemCardContainer>
            {archivings !== undefined &&
              archivings.map((item) => (
                <ArchivingCard
                  key={item.archivingId}
                  item={item}
                  isMine={true}
                />
              ))}
          </TabItemCardContainer>
        </TabItemContainer>
        <GrayDivider />
        <TabItemContainer>
          <SearchDataText>
            {i18n.t('numberOfsearchResult', { number: contents.length })}
          </SearchDataText>
          <Title>{i18n.t('contents')}</Title>
          <TabItemCardContainer>
            {contents !== undefined && (
              <ContentListContainer
                scrollEnabled={false}
                data={contents}
                numColumns={2}
                renderItem={renderItem}
              />
            )}
          </TabItemCardContainer>
        </TabItemContainer>
      </ScrollView>
    </Container>
  )
}

/**
 * ListRenderItem
 */
const renderItem: ListRenderItem<SimpleContent> = ({ item }) => {
  return (
    <ContentCard
      contentId={item.contentId}
      contentTitle={item.contentTitle}
      contentType={item.contentType}
      contentCreatedAt={item.contentCreatedAt}
      link={item.link}
      imgUrl={item.imgUrl}
      tag={item.tag}
      tagCount={item.tagCount}
    />
  )
}
