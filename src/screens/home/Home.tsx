import React from 'react'

import { AxiosError } from 'axios'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { defaultImages } from '@/assets'
import { ArchivingCard } from '@/components/ArchivingCard/ArchivingCard'
import { CategoryList } from '@/components/categoryList/CategoryList'
import HomeBackground from '@/components/homeBackground/HomeBackground'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'
import { HomeArchivingList } from '@/models/archiving/ArchivingList'
import { AllCategoryListState } from '@/state/CategoryListState'
import { CategoryState } from '@/state/CategoryState'

import {
  Container,
  NicknameText,
  SearchBar,
  Header,
  ProfileImage,
  Greeding,
  Title,
  ArchivingListContainer,
} from './Home.style'
import { getArchivingList } from './apis/getArchivingList'

/**
 * Home
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
    <HomeBackground>
      <Container>
        <Header>
          <SearchBar />
          {/* Profile Api 연동 */}
          <ProfileImage source={defaultImages.profile} />
        </Header>
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[1]}
        >
          <Greeding>
            <NicknameText>다카이브님</NicknameText>
            <Title>{i18n.t('youHaveSavedArchives', { number: 10 })}</Title>
          </Greeding>
          <CategoryList
            currentCategory={currentCategory}
            options={allCategoryList}
            onPress={handleClickCategory}
          />
          <ArchivingListContainer>
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
            <ArchivingCard
              title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
              day="2022.10.27"
              popupMenuList={PopupMenuList}
              imgCnt={1}
              linkCnt={2}
              scrapCnt={3}
            />
          </ArchivingListContainer>
        </ScrollView>
      </Container>
    </HomeBackground>
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
