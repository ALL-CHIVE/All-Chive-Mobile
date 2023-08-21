import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { ImageURISource, ListRenderItem, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getHomeArchivingList } from '@/apis/archiving'
import { getUser } from '@/apis/user'
import { defaultImages } from '@/assets'
import SearchButton from '@/components/buttons/searchButton/SearchButton'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import HomeContainer from '@/components/containers/homeContainer/HomeContainer'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import { CategoryList } from '@/components/lists/categoryList/CategoryList'
import { Loading } from '@/components/loading/Loading'
import i18n from '@/locales'
import { ArchivingListContent, MainArchivingListResponse } from '@/models/Archiving'
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

  const [currentCategory, setCurrentCategory] = useRecoilState(CategoryState)
  const allCategoryList = useRecoilValue(AllCategoryListState)
  const [isProfileImageError, setIsProfileImageError] = useState(false)

  const {
    data: profileData,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useQuery(['getUser'], () => getUser())

  const {
    data: archivingList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<MainArchivingListResponse, AxiosError>(
    ['getHomeArchivingList', currentCategory],
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
      queryClient.setQueryData(['getHomeArchivingList', currentCategory], archivingList)
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

  return (
    <>
      {isProfileLoading || isLoading ? <Loading /> : <></>}
      <ErrorDialog
        isVisible={isProfileError}
        onClick={() => {
          queryClient.invalidateQueries(['getUser'])
        }}
      />
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
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
                  : { uri: `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${profileData.imgUrl}` }
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
const renderItem: ListRenderItem<ArchivingListContent> = ({ item }) => {
  return (
    <ArchivingCard
      item={item}
      isMine={true}
    />
  )
}
