import React, { useEffect } from 'react'

import { AxiosError } from 'axios'
import { ListRenderItem, NativeScrollEvent } from 'react-native'
import { useInfiniteQuery, useQueryClient } from 'react-query'
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
import { isWindowWidthSmallerThen } from '@/services/SizeService'
import { AllCategoryListState } from '@/state/CategoryListState'
import { CategoryState } from '@/state/CategoryState'

import {
  NicknameText,
  Header,
  ProfileImage,
  Greeding,
  Title,
  ScrollContainer,
  SearchContainer,
  BackgroundImage,
  Blank,
  ArchivingCardList,
  Styles,
} from './Home.style'

const PAGE_LIMIT = isWindowWidthSmallerThen(750) ? 10 : 12
const LIST_NUMS_COLUMNS = isWindowWidthSmallerThen(750) ? 1 : 2

/**
 * Home
 */
export const Home = () => {
  const currentCategory = useRecoilValue(CategoryState)
  const allCategoryList = useRecoilValue(AllCategoryListState)
  const queryClient = useQueryClient()

  const {
    data: archivingList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getArchivingList', currentCategory],
    ({ pageParam = 0 }) => getHomeArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    }
  )

  useEffect(() => {
    if (!isLoading) {
      queryClient.setQueryData(['getArchivingList', currentCategory], archivingList)
    }
  }, [currentCategory, archivingList, isLoading])

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
        <ArchivingCardList
          contentContainerStyle={Styles.flatList}
          scrollEnabled={false}
          numColumns={LIST_NUMS_COLUMNS}
          renderItem={renderItem}
          data={archivingList?.pages.map((page: MainArchivingListResponse) => page.content).flat()}
        />
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
