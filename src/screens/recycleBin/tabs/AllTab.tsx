import React from 'react'

import { ListRenderItem, ScrollView, TouchableOpacity } from 'react-native'
import { useRecoilState } from 'recoil'

import CheckIcon from '@/assets/icons/check-default.svg'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import i18n from '@/locales'
import { ContentCardInfo } from '@/models/ContentCard'
import { RecycleBinTabProps } from '@/models/Recycle'
import { CheckArchivingState, CheckContentState } from '@/state/CheckState'

import {
  Container,
  TabItemContainer,
  SearchDataText,
  CheckBox,
  ContentListContainer,
  GrayDivider,
  TabItemCardContainer,
  Title,
  Header,
  Styles,
} from './Tab.style'

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
  const renderItem: ListRenderItem<ContentCardInfo> = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.contentId}
        onPress={() => handleCheck(item.contentId, 'content')}
        disabled={!editMode}
      >
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
        {editMode && <CheckBox />}
        {editMode && isContentCheck.includes(item.contentId) && (
          <CheckIcon style={Styles.checkIcon} />
        )}
      </TouchableOpacity>
    )
  }

  return (
    <Container>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TabItemContainer>
          <Header>
            <SearchDataText>
              {i18n.t('numberOfRecycleItem', { number: archivings.length })}
            </SearchDataText>
            <Title>{i18n.t('archiving')}</Title>
          </Header>
          <TabItemCardContainer>
            {archivings &&
              archivings.map((item) => (
                <TouchableOpacity
                  key={item.archivingId}
                  style={{ alignItems: 'center' }}
                  onPress={() => handleCheck(item.archivingId, 'archiving')}
                  disabled={!editMode}
                >
                  <ArchivingCard
                    key={item.archivingId}
                    item={item}
                    isMine={true}
                    isRecycle={true}
                  />
                  {editMode && <CheckBox />}
                  {editMode && isArchivingCheck.includes(item.archivingId) && (
                    <CheckIcon style={Styles.checkIcon} />
                  )}
                </TouchableOpacity>
              ))}
          </TabItemCardContainer>
        </TabItemContainer>
        <GrayDivider />
        <TabItemContainer>
          <Header>
            <SearchDataText>
              {i18n.t('numberOfRecycleItem', { number: contents.length })}
            </SearchDataText>
            <Title>{i18n.t('contents')}</Title>
          </Header>
          <TabItemCardContainer>
            {contents && (
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
