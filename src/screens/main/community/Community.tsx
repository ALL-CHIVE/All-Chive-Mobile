import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { ImageURISource, ListRenderItem, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  getCommunityArchivingList,
  getPopularArchivings,
  getScrapArchivingList,
} from '@/apis/archiving'
import { getUser } from '@/apis/user'
import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import { PopularArchivingCard } from '@/components/cards/popularArchivingCard/PopularArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { ArchivingListContent, MainArchivingListResponse } from '@/models/Archiving'
import { CommunityMenuType } from '@/models/enums/CommunityMenuType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { isCloseToBottom } from '@/services/InfiniteService'
import { isWindowWidthSmallerThen } from '@/services/SizeService'
import { AllCategoryListState } from '@/state/CategoryListState'
import { CommunityCategoryState } from '@/state/CategoryState'

import {
  Header,
  ProfileImage,
  Greeding,
  Title,
  ScrollContainer,
  SearchContainer,
  Blank,
  ArchivingCardList,
  Styles,
  List,
} from '../Main.style'

import {
  BackgroundImage,
  Menu,
  MenuButton,
  MenuText,
  PopularContainer,
  SelectedStyle,
} from './Community.style'

const PAGE_LIMIT = isWindowWidthSmallerThen(750) ? 10 : 12
const LIST_NUMS_COLUMNS = isWindowWidthSmallerThen(750) ? 1 : 2

/**
 * Community
 */
export const Community = () => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<MainNavigationProp>()

  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [currentCommunityMenu, setCurrentCommunityMenu] = useState(CommunityMenuType.Community)

  const allCategoryList = useRecoilValue(AllCategoryListState)
  const [currentCategory, setCurrentCategory] = useRecoilState(CommunityCategoryState)

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUser'], () => getUser())

  const {
    data: popularData,
    isLoading: isPopuplarLoading,
    isError: isPopularError,
  } = useQuery(['getPopularArchivings'], () => getPopularArchivings())

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

  const {
    data: scrapArchivingList,
    fetchNextPage: fetchScrapNextPage,
    hasNextPage: hasScrapNextPage,
    isLoading: isScrapLoading,
    isError: isScrapError,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getScrapArchivingList', currentCategory],
    ({ pageParam = 0 }) => getScrapArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
    }
  )

  useEffect(() => {
    switch (currentCommunityMenu) {
      case CommunityMenuType.Community:
        if (!isLoading) {
          queryClient.setQueryData(['getCommunityArchivingList', currentCategory], archivingList)
        }
        break
      case CommunityMenuType.Scrap:
        if (!isScrapLoading) {
          queryClient.setQueryData(['getScrapArchivingList', currentCategory], scrapArchivingList)
        }
        break
    }
  }, [currentCommunityMenu, currentCategory, archivingList, isLoading])

  /**
   * 무한스크롤 요청입니다.
   */
  const onEndReached = () => {
    switch (currentCommunityMenu) {
      case CommunityMenuType.Community:
        if (hasNextPage) {
          fetchNextPage()
        }
        break
      case CommunityMenuType.Scrap:
        if (hasScrapNextPage) {
          fetchScrapNextPage()
        }
        break
    }
  }

  if (
    (currentCommunityMenu === CommunityMenuType.Community && isError) ||
    (currentCommunityMenu === CommunityMenuType.Scrap && isScrapError)
  ) {
    return <>Error!</>
  }

  return (
    <>
      {isProfileLoading || isLoading || isScrapLoading || isPopuplarLoading ? <Loading /> : <></>}
      <ErrorDialog
        isVisible={isProfileError}
        onClick={() => {
          queryClient.invalidateQueries(['getUser'])
        }}
      />
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['getCommunityArchivingList', currentCategory])
        }}
      />
      <ErrorDialog
        isVisible={isScrapError}
        onClick={() => {
          queryClient.invalidateQueries(['getScrapArchivingList', currentCategory])
        }}
      />
      <ErrorDialog
        isVisible={isPopularError}
        onClick={() => {
          queryClient.invalidateQueries(['getPopularArchivings'])
        }}
      />

      <HomeContainer>
        <Header>
          <SearchContainer style={{ flex: 1 }}>
            <SearchButton />
          </SearchContainer>
          <TouchableOpacity onPress={() => navigation.navigate('Mypage')}>
            <ProfileImage
              source={
                isProfileImageError || !profileData?.imgUrl
                  ? defaultImages.profile
                  : { uri: `${Config.ALLCHIVE_ASSET_SERVER}/${profileData.imgUrl}` }
              }
              onError={() => setIsProfileImageError(true)}
              defaultSource={defaultImages.profile as ImageURISource}
            />
          </TouchableOpacity>
        </Header>
        <ScrollContainer
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[2]}
          onScrollEndDrag={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              onEndReached()
            }
          }}
        >
          <Greeding style={{ marginBottom: 47 }}>
            <>
              <Title>{i18n.t('communityTabTitle')}</Title>
            </>
            <BackgroundImage source={defaultImages.communityBackground} />
            <PopularContainer
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {popularData &&
                popularData.archivings.map((item) => (
                  <PopularArchivingCard
                    key={item.archivingId}
                    item={item}
                  />
                ))}
            </PopularContainer>
          </Greeding>
          <Menu>
            <MenuButton
              style={
                currentCommunityMenu === CommunityMenuType.Community && SelectedStyle.menuButton
              }
              onPress={() => setCurrentCommunityMenu(CommunityMenuType.Community)}
            >
              <MenuText
                style={
                  currentCommunityMenu === CommunityMenuType.Community && SelectedStyle.menuText
                }
              >
                {i18n.t('community')}
              </MenuText>
            </MenuButton>
            <MenuButton
              style={currentCommunityMenu === CommunityMenuType.Scrap && SelectedStyle.menuButton}
              onPress={() => setCurrentCommunityMenu(CommunityMenuType.Scrap)}
            >
              <MenuText
                style={currentCommunityMenu === CommunityMenuType.Scrap && SelectedStyle.menuText}
              >
                {i18n.t('scrap')}
              </MenuText>
            </MenuButton>
          </Menu>
          <CategoryList
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            options={allCategoryList}
          />
          {(currentCommunityMenu === CommunityMenuType.Community &&
            !archivingList?.pages.map((page: MainArchivingListResponse) => page.content).flat()
              .length) ||
          (currentCommunityMenu === CommunityMenuType.Scrap &&
            !scrapArchivingList?.pages.map((page: MainArchivingListResponse) => page.content).flat()
              .length) ? (
            <EmptyItem
              textKey={
                currentCommunityMenu === CommunityMenuType.Community
                  ? 'noCommunityArchiving'
                  : 'noScrapArchiving'
              }
            />
          ) : (
            <List>
              <ArchivingCardList
                contentContainerStyle={Styles.flatList}
                scrollEnabled={false}
                numColumns={LIST_NUMS_COLUMNS}
                renderItem={renderItem}
                data={
                  currentCommunityMenu === CommunityMenuType.Community
                    ? archivingList?.pages
                        .map((page: MainArchivingListResponse) => page.content)
                        .flat()
                    : scrapArchivingList?.pages
                        .map((page: MainArchivingListResponse) => page.content)
                        .flat()
                }
              />
            </List>
          )}
          <Blank />
        </ScrollContainer>
      </HomeContainer>
    </>
  )
}

/**
 * renderItem
 */
const renderItem: ListRenderItem<ArchivingListContent> = ({ item }) => {
  return <ArchivingCard item={item} />
}
