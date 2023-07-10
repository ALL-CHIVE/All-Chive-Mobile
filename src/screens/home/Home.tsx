import React from 'react'

import { AxiosError } from 'axios'
import { ScrollView, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { Category } from '@/components/category/Category'
import { ArchivingList } from '@/components/list/ArchivingList'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'
import { HomeArchivingList } from '@/models/archiving/ArchivingList'
import { AllCategoryListState } from '@/recoils/CategoryListState'
import { CategoryState } from '@/state/CategoryState'
import { colors } from '@/styles/colors'

import {
  Container,
  CategoryContainer,
  NicknameText,
  SearchBar,
  TitleText,
  ArchivingListContainer,
} from './Home.style'
import { getArchivingList } from './apis/getArchivingList'

/**
 *
 */
export const Home = () => {
  const currentCategory = useRecoilValue(CategoryState)
  const allCategoryList = useRecoilValue(AllCategoryListState)
  const { data: archivingList } = useQuery<HomeArchivingList, AxiosError>(
    ['getArchivingList'],
    () =>
      getArchivingList({
        category: currentCategory,
        page: 1,
        limit: 10,
      })
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
  const handleClickCategory = (value: string) => {
    // TODO: currentCategoryState에 따른 카테고리 리스트 불러오기
  }

  return (
    <>
      <ScrollView>
        <LinearGradient colors={[colors.yellow200, colors.white]}>
          <Container>
            <SearchBar />
            {/* Profile Button */}
            <NicknameText>다카이브님</NicknameText>
            <TitleText>{i18n.t('youHaveSavedArchives', { number: 10 })}</TitleText>
            <ScrollView horizontal={true}>
              <CategoryContainer>
                <Category
                  options={allCategoryList}
                  onPress={handleClickCategory}
                />
              </CategoryContainer>
            </ScrollView>
            <ArchivingListContainer>
              <TouchableOpacity>
                <ArchivingList
                  title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
                  day="2022.10.27"
                  popupMenuList={PopupMenuList}
                  imgCnt={1}
                  linkCnt={2}
                  scrapCnt={3}
                />
              </TouchableOpacity>
            </ArchivingListContainer>
          </Container>
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
    title: 'fix',
    onClick: HandleFix,
  },
  { title: 'delete', onClick: HandleRemove },
]
