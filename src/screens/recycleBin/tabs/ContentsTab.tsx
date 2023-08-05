import React, { useState } from 'react'

import { Image, ListRenderItem, ScrollView, View } from 'react-native'

import { defaultIcons } from '@/assets'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import i18n from '@/locales'
import { RecycleBinTabProps } from '@/models/Recycle'
import { SimpleContent } from '@/models/SimpleContent'

import {
  CheckBox,
  Container,
  ContentListContainer,
  SearchDataText,
  TabItemCardContainer,
  TabItemContainer,
  Title,
  YellowCheck,
} from '../RecycleBin.style'

/**
 * 삭제된 컨텐츠만 보여주는 탭
 */
export const ContentsTab = ({ contents, editMode }: RecycleBinTabProps) => {
  const [isCheck, setIsCheck] = useState<number[]>([])

  /**
   * 체크박스 클릭을 핸들링합니다.
   */
  const handleCheck = (item: number) => {
    if (isCheck.includes(item)) {
      setIsCheck(isCheck.filter((id) => id !== item))
      return
    } else {
      setIsCheck([...isCheck, item])
    }
  }

  /**
   * ListRenderItem
   */
  const renderItem: ListRenderItem<SimpleContent> = ({ item }) => {
    return (
      <View>
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
        {editMode && <CheckBox onPress={() => handleCheck(item.contentId)} />}
        {isCheck.includes(item.contentId) && (
          <YellowCheck onPress={() => handleCheck(item.contentId)}>
            <Image source={defaultIcons.yellowCheck} />
          </YellowCheck>
        )}
      </View>
    )
  }

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
