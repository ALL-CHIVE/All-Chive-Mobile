import React from 'react'

import { ListRenderItem, ScrollView } from 'react-native'

import ContentCard from '@/components/cards/contentCard/ContentCard'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'
import { SimpleContent } from '@/models/SimpleContent'

import {
  Container,
  ContentListContainer,
  SearchDataText,
  TabItemCardContainer,
  TabItemContainer,
  Title,
} from '../RecycleBin.style'

/**
 * 내 아카이빙만 보여주는 탭
 */
export const ContentsTab = ({ contents }: RecyclesResponse) => {
  return (
    <Container>
      <TabItemContainer>
        <ScrollView>
          <SearchDataText>
            {i18n.t('numberOfRecycleItem', { number: contents.length })}
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
        </ScrollView>
      </TabItemContainer>
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
