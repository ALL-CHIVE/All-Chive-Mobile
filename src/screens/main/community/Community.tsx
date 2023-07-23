import React, { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { ListRenderItem, NativeScrollEvent } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { getCommunityArchivingList } from '@/apis/archiving/archiving'
import { getProfile } from '@/apis/user'
import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import i18n from '@/locales'
import {
  ArchivingListContent,
  MainArchivingListResponse,
} from '@/models/archiving/MainArchivingList'
import { Category } from '@/models/enums/Category'
import { CommunityMenuType } from '@/models/enums/CommunityMenuType'
import { isWindowWidthSmallerThen } from '@/services/SizeService'
import { AllCategoryListState } from '@/state/CategoryListState'

import {
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
  List,
} from '../Main.style'

const PAGE_LIMIT = isWindowWidthSmallerThen(750) ? 10 : 12
const LIST_NUMS_COLUMNS = isWindowWidthSmallerThen(750) ? 1 : 2

/**
 * Community
 */
export const Community = () => {
  const [currentCategory, setCurrentCategory] = useState(Category.All)
  const allCategoryList = useRecoilValue(AllCategoryListState)
  const [currentCommunityMenu, setCurrentCommunityMenu] = useState(CommunityMenuType.Community)
  const queryClient = useQueryClient()

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getProfile'], () => getProfile())

  const {
    data: archivingList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getCommunityArchivingList', currentCategory],
    ({ pageParam = 0 }) => getCommunityArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    }
  )

  useEffect(() => {
    if (!isLoading) {
      queryClient.setQueryData(['getCommunityArchivingList', currentCategory], archivingList)
    }
  }, [currentCategory, archivingList, isLoading])

  /**
   * 무한스크롤 요청입니다.
   */
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  if (isError) {
    return <>Error!</>
  }

  return (
    <HomeContainer>
      <Header>
        <SearchContainer style={{ flex: 1 }}>
          <SearchButton />
        </SearchContainer>
        {profileData?.imgUrl ? (
          <ProfileImage source={{ uri: profileData.imgUrl }} />
        ) : (
          <ProfileImage source={defaultImages.profile} />
        )}
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
            <Title>{i18n.t('scrapArchiveYouWant')}</Title>
          </>
          <BackgroundImage source={defaultImages.communityBackground} />
        </Greeding>
        <CategoryList
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          options={allCategoryList}
        />
        <List>
          <ArchivingCardList
            contentContainerStyle={Styles.flatList}
            scrollEnabled={false}
            numColumns={LIST_NUMS_COLUMNS}
            renderItem={renderItem}
            data={archivingList?.pages
              .map((page: MainArchivingListResponse) => page.content)
              .flat()}
          />
        </List>
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
 * renderItem
 */
const renderItem: ListRenderItem<ArchivingListContent> = ({ item }) => {
  return <ArchivingCard item={item} />
}
