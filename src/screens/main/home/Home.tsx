import React from 'react'

import { AxiosError } from 'axios'
import { FlatList, ListRenderItem, NativeScrollEvent } from 'react-native'
import { useInfiniteQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { getHomeArchivingList } from '@/apis/archiving/archiving'
import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'
import {
  ArchivingListContent,
  MainArchivingListResponse,
} from '@/models/archiving/MainArchivingList'
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

const PAGE_LIMIT = 10

/**
 * Home
 */
export const Home = () => {
  const currentCategory = useRecoilValue(CategoryState)
  const allCategoryList = useRecoilValue(AllCategoryListState)

  const {
    data: archivingList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getArchivingList'],
    ({ pageParam = 0 }) => getHomeArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    }
  )

  /**
   *
   */
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
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
        onScrollEndDrag={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            onEndReached()
          }
        }}
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
        <ArchivingListContainer style={{ flex: 1 }}>
          <FlatList
            scrollEnabled={false}
            numColumns={1}
            renderItem={renderItem}
            data={archivingList?.pages
              .map((page: MainArchivingListResponse) => page.content)
              .flat()}
          />
        </ArchivingListContainer>
        <Blank />
      </ScrollContainer>
    </HomeContainer>
  )
}

/**
 * isCloseToBottom
 */
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
  const paddingToBottom = 600
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
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

/**
 * renderItem
 */
const renderItem: ListRenderItem<ArchivingListContent> = ({ item }) => {
  return (
    <ArchivingCard
      key={item.archivingId}
      title={item.title}
      day={item.createdAt}
      popupMenuList={PopupMenuList}
      imgCnt={item.imgCnt}
      linkCnt={item.linkCnt}
      scrapCnt={item.scrapCnt}
    />
  )
}
