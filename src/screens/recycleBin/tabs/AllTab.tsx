import React from 'react'

import { Image, ListRenderItem, ScrollView, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { defaultIcons } from '@/assets'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import i18n from '@/locales'
import { RecycleBinTabProps } from '@/models/Recycle'
import { SimpleContent } from '@/models/SimpleContent'
import { CheckArchivingState, CheckContentState } from '@/state/CheckState'

import {
  CheckBox,
  Container,
  ContentListContainer,
  GrayDivider,
  SearchDataText,
  TabItemCardContainer,
  TabItemContainer,
  Title,
  YellowCheck,
} from '../RecycleBin.style'

/**
 * 전체 탭
 */
export const AllTab = ({ contents, archivings, editMode }: RecycleBinTabProps) => {
  const [isArchivingCheck, setIsArchivingCheck] = useRecoilState(CheckArchivingState)
  const [isContentCheck, setIsContentCheck] = useRecoilState(CheckContentState)

  /**
   * 체크박스 클릭을 핸들링합니다.
   */
  const handleCheck = (item: number, type: 'archiving' | 'content') => {
    switch (type) {
      case 'archiving':
        if (isArchivingCheck.includes(item)) {
          setIsArchivingCheck(isArchivingCheck.filter((id) => id !== item))
          return
        } else {
          setIsArchivingCheck([...isArchivingCheck, item])
        }
        break
      case 'content':
        if (isContentCheck.includes(item)) {
          setIsContentCheck(isContentCheck.filter((id) => id !== item))
          return
        } else {
          setIsContentCheck([...isContentCheck, item])
        }
        break
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
          isRecycle={true}
        />
        {editMode && <CheckBox onPress={() => handleCheck(item.contentId, 'content')} />}
        {editMode && isContentCheck.includes(item.contentId) && (
          <YellowCheck onPress={() => handleCheck(item.contentId, 'content')}>
            <Image source={defaultIcons.yellowCheck} />
          </YellowCheck>
        )}
      </View>
    )
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TabItemContainer>
          <SearchDataText>
            {i18n.t('numberOfRecycleItem', { number: archivings.length })}
          </SearchDataText>
          <Title>{i18n.t('archiving')}</Title>
          <TabItemCardContainer>
            {archivings !== undefined &&
              archivings.map((item) => (
                <View key={item.archivingId}>
                  <ArchivingCard
                    key={item.archivingId}
                    item={item}
                    isMine={true}
                    isRecycle={true}
                  />
                  {editMode && (
                    <CheckBox onPress={() => handleCheck(item.archivingId, 'archiving')} />
                  )}
                  {editMode && isArchivingCheck.includes(item.archivingId) && (
                    <YellowCheck onPress={() => handleCheck(item.archivingId, 'archiving')}>
                      <Image source={defaultIcons.yellowCheck} />
                    </YellowCheck>
                  )}
                </View>
              ))}
          </TabItemCardContainer>
        </TabItemContainer>
        <GrayDivider />
        <TabItemContainer>
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
        </TabItemContainer>
      </ScrollView>
    </Container>
  )
}
