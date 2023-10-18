import React, { useEffect, useMemo, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { throttle } from 'lodash'
import { ImageURISource, ListRenderItem, TouchableOpacity } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import {
  getCommunityArchivingList,
  getPopularArchivings,
  getScrapArchivingList,
} from '@/apis/archiving/ArchivingList'
import { getUser } from '@/apis/user/User'
import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import { PopularArchivingCard } from '@/components/cards/popularArchivingCard/PopularArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import { Loading } from '@/components/loading/Loading'
import useSticky from '@/hooks/useSticky'
import i18n from '@/locales'
import { ArchivingInfo, MainArchivingListResponse } from '@/models/Archiving'
import { GetAllCategory } from '@/models/enums/Category'
import { CommunityMenuType } from '@/models/enums/CommunityMenuType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { isCloseToBottom } from '@/services/InfiniteService'
import { isWindowWidthSmallerThen } from '@/services/SizeService'
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
  const [profileErrorVisible, setProfileErrorVisible] = useState(false)
  const [popularErrorVisible, setPopularErrorVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [scrapErrorVisible, setScrapErrorVisible] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  const allCategoryList = useMemo(() => GetAllCategory(), [])
  const [currentCategory, setCurrentCategory] = useRecoilState(CommunityCategoryState)
  const { isSticky, handleScroll } = useSticky(515)

  const { data: profileData, isLoading: isProfileLoading } = useQuery(
    ['getUser'],
    () => getUser(),
    {
      /**
       *
       */
      onError: () => {
        setProfileErrorVisible(true)
      },
    }
  )

  const { data: popularData, isLoading: isPopuplarLoading } = useQuery(
    ['getPopularArchivings'],
    () => getPopularArchivings(),
    {
      /**
       *
       */
      onError: () => {
        setPopularErrorVisible(true)
      },
    }
  )

  const {
    data: archivingList,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getCommunityArchivingList', currentCategory],
    ({ pageParam = 0 }) => getCommunityArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
      /**
       *
       */
      onError: () => {
        setErrorVisible(true)
      },
    }
  )

  const {
    data: scrapArchivingList,
    fetchNextPage: fetchScrapNextPage,
    hasNextPage: hasScrapNextPage,
    isLoading: isScrapLoading,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getScrapArchivingList', currentCategory],
    ({ pageParam = 0 }) => getScrapArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
      /**
       *
       */
      onError: () => {
        setScrapErrorVisible(true)
      },
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
  }, [
    currentCommunityMenu,
    currentCategory,
    archivingList,
    scrapArchivingList,
    isLoading,
    isScrapLoading,
  ])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading || isProfileLoading || isScrapLoading || isPopuplarLoading) {
        setShowLoading(true)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [isLoading || isProfileLoading || isScrapLoading || isPopuplarLoading])

  const throttledNextPage = throttle(fetchNextPage, 1000)
  const throttledScrapNextPage = throttle(fetchScrapNextPage, 1000)

  /**
   * 무한스크롤 요청입니다.
   */
  const onEndReached = () => {
    switch (currentCommunityMenu) {
      case CommunityMenuType.Community:
        if (hasNextPage) {
          throttledNextPage()
        }
        break
      case CommunityMenuType.Scrap:
        if (hasScrapNextPage) {
          throttledScrapNextPage()
        }
        break
    }
  }

  return (
    <>
      {showLoading && (isProfileLoading || isLoading || isScrapLoading || isPopuplarLoading) ? (
        <Loading />
      ) : (
        <></>
      )}
      <InformationErrorDialog
        isVisible={profileErrorVisible}
        onRetry={() => {
          setProfileErrorVisible(false)
          queryClient.invalidateQueries(['getUser'])
        }}
        onClick={() => {
          setProfileErrorVisible(false)
        }}
      />
      <InformationErrorDialog
        isVisible={errorVisible}
        onRetry={() => {
          setErrorVisible(false)
          queryClient.invalidateQueries(['getCommunityArchivingList', currentCategory])
        }}
        onClick={() => {
          setErrorVisible(false)
        }}
      />
      <InformationErrorDialog
        isVisible={scrapErrorVisible}
        onRetry={() => {
          setScrapErrorVisible(false)
          queryClient.invalidateQueries(['getScrapArchivingList', currentCategory])
        }}
        onClick={() => {
          setScrapErrorVisible(false)
        }}
      />
      <InformationErrorDialog
        isVisible={popularErrorVisible}
        onRetry={() => {
          setPopularErrorVisible(false)
          queryClient.invalidateQueries(['getPopularArchivings'])
        }}
        onClick={() => {
          setPopularErrorVisible(false)
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
                  : { uri: profileData.imgUrl }
              }
              onError={() => setIsProfileImageError(true)}
              defaultSource={defaultImages.profile as ImageURISource}
            />
          </TouchableOpacity>
        </Header>
        <ScrollContainer
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[2]}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onScrollEndDrag={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              onEndReached()
            }
          }}
        >
          <Greeding style={{ marginBottom: 47, marginTop: 13 }}>
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
            isSticky={isSticky}
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
              marginTop={43}
            />
          ) : (
            <List>
              <ArchivingCardList
                contentContainerStyle={Styles.flatList}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
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
const renderItem: ListRenderItem<ArchivingInfo> = ({ item }) => {
  return <ArchivingCard item={item} />
}
