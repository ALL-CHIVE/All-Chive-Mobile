import React from 'react'

import { AxiosError } from 'axios'
import { ScrollView, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useQuery } from 'react-query'

import { CategoryList } from '@/components/list/CategoryList'
import { Topic } from '@/components/topic/Topic'
import { PopupMenu } from '@/models/PopupMenu'
import { ArchivingCategoryList } from '@/models/category/CategoryList'
import { colors } from '@/styles/colors'

import {
  ArchivingContainer,
  CategoryContainer,
  CategoryListContainer,
  NicknameText,
  SearchBar,
  TitleText,
} from './Archiving.style'
import { getCategoryList } from './apis/getCategoryList'

// 추후 수정
const TopicList = [
  '전체',
  '푸드',
  '라이프',
  '홈·리빙',
  '쇼핑',
  '스포츠',
  '자기계발',
  '테크',
  '디자인',
  '트렌드',
]

/**
 *
 */
export const Archiving = () => {
  const { data: categoryList } = useQuery<ArchivingCategoryList, AxiosError>(
    ['getCategoryList'],
    () => getCategoryList()
  )

  /**
   *
   */
  const handleUplaod = () => {
    // console.log('upload') // upload 화면으로 navigation
  }

  /**
   *
   */
  const handleClickTopic = () => {
    // TODO
  }

  return (
    <>
      <ScrollView>
        <LinearGradient colors={[colors.yellow200, colors.white]}>
          <ArchivingContainer>
            <SearchBar />
            {/* Profile Button */}
            <NicknameText>다카이브님</NicknameText>
            <TitleText>{`현재까지 총 10개의\n아카이빙을\n저장하고 계세요!`}</TitleText>
            <ScrollView horizontal={true}>
              <CategoryContainer>
                {TopicList.map((category, index) => (
                  <Topic
                    key={index}
                    text={category}
                    onPress={handleClickTopic} // 추후 수정
                  />
                ))}
              </CategoryContainer>
            </ScrollView>
            <CategoryListContainer>
              <TouchableOpacity>
                <CategoryList
                  title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
                  day="2022.10.27"
                  popupMenuList={PopupMenuList}
                  imgCnt={1}
                  linkCnt={2}
                  scrapCnt={3}
                />
              </TouchableOpacity>
            </CategoryListContainer>
          </ArchivingContainer>
        </LinearGradient>
      </ScrollView>
    </>
  )
}

/**
 *
 */
const HandleFix = () => {
  // TODO
}

/**
 *
 */
const HandleRemove = () => {
  // TODO
}

const PopupMenuList: PopupMenu[] = [
  {
    title: '고정',
    onClick: HandleFix,
  },
  { title: '삭제', onClick: HandleRemove },
]
