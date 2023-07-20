import React from 'react'

import { AxiosError } from 'axios'
import { ScrollView, View } from 'react-native'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'
import { HomeArchivingList } from '@/models/archiving/ArchivingList'
import { AllCategoryListState } from '@/state/CategoryListState'
import { CategoryState } from '@/state/CategoryState'

import {
  NicknameText,
  Header,
  ProfileImage,
  Greeding,
  Title,
  ArchivingListContainer,
  ScrollContainer,
  SearchContainer,
  BackgroundImage,
  Blank,
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

  return (
    <HomeContainer>
      <Header>
        <SearchContainer style={{ flex: 1 }}>
          <SearchButton />
        </SearchContainer>
        {/* Profile Api 연동 */}
        <ProfileImage source={defaultImages.profile} />
      </Header>
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <Greeding>
          <>
            {/* TODO: 이름, 컨텐츠 개수 연결 */}
            <NicknameText>다카이브님</NicknameText>
            <Title>{i18n.t('youHaveSavedArchives', { number: 10 })}</Title>
          </>
          <BackgroundImage source={defaultImages.homeBackground} />
        </Greeding>
        <CategoryList
          currentCategory={currentCategory}
          options={allCategoryList}
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
        <Blank />
      </ScrollContainer>
    </HomeContainer>
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
