import React from 'react'

import { ListRenderItem, ScrollView, TouchableOpacity, View } from 'react-native'
import { useRecoilState } from 'recoil'

import CheckIcon from '@/assets/icons/check-yellow.svg'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import i18n from '@/locales'
import { ContentCardInfo } from '@/models/ContentCard'
import { RecycleBinTabProps } from '@/models/Recycle'
import { CheckContentState } from '@/state/CheckState'

import {
  TabItemContainer,
  SearchDataText,
  CheckBox,
  ContentListContainer,
  TabItemCardContainer,
  Title,
  Container,
  Styles,
} from './Tab.style'

/**
 * 삭제된 컨텐츠만 보여주는 탭
 */
export const ContentsTab = ({ contents, editMode }: RecycleBinTabProps) => {
  const [isCheck, setIsCheck] = useRecoilState(CheckContentState)

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
  const renderItem: ListRenderItem<ContentCardInfo> = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.contentId}
        onPress={() => handleCheck(item.contentId)}
        disabled={!editMode}
      >
        <ContentCard
          archivingId={0}
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
        {editMode && isCheck.includes(item.contentId) && <CheckIcon style={Styles.checkIcon} />}
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
          <SearchDataText>
            {i18n.t('numberOfRecycleItem', { number: contents.length })}
          </SearchDataText>
          <Title>{i18n.t('contents')}</Title>
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
