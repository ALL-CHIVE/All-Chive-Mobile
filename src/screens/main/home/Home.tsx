import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { throttle } from 'lodash'
import { ImageURISource, ListRenderItem, TouchableOpacity } from 'react-native'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getHomeArchivingList } from '@/apis/archiving/ArchivingList'
import { getUser } from '@/apis/user/User'
import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import { Loading } from '@/components/loading/Loading'
import useSticky from '@/hooks/useSticky'
import i18n from '@/locales'
import { ArchivingInfo, MainArchivingListResponse } from '@/models/Archiving'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { isCloseToBottom } from '@/services/InfiniteService'
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
  List,
} from '../Main.style'

const PAGE_LIMIT = isWindowWidthSmallerThen(750) ? 10 : 12
const LIST_NUMS_COLUMNS = isWindowWidthSmallerThen(750) ? 1 : 2

/**
 * Home
 */
export const Home = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)
  const [profileErrorVisible, setProfileErrorVisible] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useRecoilState(CategoryState)
  const allCategoryList = useRecoilValue(AllCategoryListState)
  const { isSticky, handleScroll } = useSticky(265)
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

  const {
    data: archivingList,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getHomeArchivingList', currentCategory],
    ({ pageParam = 0 }) => getHomeArchivingList(currentCategory, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
      /**
       *
       */
      onError: () => {
        setErrorDialogVisible(true)
      },
    }
  )

  useEffect(() => {
    if (!isLoading) {
      queryClient.setQueryData(['getHomeArchivingList', currentCategory], archivingList)
    }
  }, [currentCategory, archivingList, isLoading])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading || isProfileLoading) {
        setShowLoading(true)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [isLoading || isProfileLoading])

  const throttledNextPage = throttle(fetchNextPage, 1000)

  /**
   * 무한스크롤 요청입니다.
   */
  const onEndReached = () => {
    if (hasNextPage) {
      throttledNextPage()
    }
  }

  return (
    <>
      {showLoading && (isProfileLoading || isLoading) ? <Loading /> : <></>}
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
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
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
          showsHorizontalScrollIndicator={false}
          stickyHeaderIndices={[1]}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onScrollEndDrag={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              onEndReached()
            }
          }}
        >
          <Greeding>
            <>
              <NicknameText>{i18n.t('userName', { nickname: profileData?.nickname })}</NicknameText>
              <Title>
                {i18n.t('youHaveSavedArchives', {
                  number: profileData?.archivingCount ? profileData.archivingCount : 0,
                })}
              </Title>
            </>
            <BackgroundImage source={defaultImages.homeBackground} />
          </Greeding>
          <CategoryList
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            options={allCategoryList}
            isSticky={isSticky}
          />
          {!archivingList?.pages.map((page: MainArchivingListResponse) => page.content).flat()
            .length ? (
            <EmptyItem
              textKey="noHomeArchiving"
              marginTop={39}
            />
          ) : (
            <List>
              <ArchivingCardList
                contentContainerStyle={Styles.flatList}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={LIST_NUMS_COLUMNS}
                renderItem={renderItem}
                data={archivingList?.pages
                  .map((page: MainArchivingListResponse) => page.content)
                  .flat()}
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
  return (
    <ArchivingCard
      item={item}
      isMine={true}
    />
  )
}
