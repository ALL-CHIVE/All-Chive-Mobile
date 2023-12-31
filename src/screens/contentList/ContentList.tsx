import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { throttle } from 'lodash'
import { ImageURISource, ListRenderItem } from 'react-native'
import { Directions } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { deleteArchiving, patchScrapArchiving } from '@/apis/archiving/Archiving'
import { getContentByArchiving } from '@/apis/archiving/ArchivingList'
import { postBlock } from '@/apis/block/Block'
import { defaultImages } from '@/assets'
import ScrapFillIcon from '@/assets/icons/scrap-fill.svg'
import ScrapIcon from '@/assets/icons/scrap.svg'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import EmptyItem from '@/components/emptyItem/EmptyItem'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import { Loading } from '@/components/loading/Loading'
import { EditArchivingModal } from '@/components/modal/archivingModal/editArchivingModal/EditArchivingModal'
import { SwipeScreen } from '@/components/swipe/SwipeScreen'
import i18n from '@/locales'
import { ContentByArchivingResponse } from '@/models/Archiving'
import { ContentCardInfo } from '@/models/ContentCard'
import { PopupMenu } from '@/models/PopupMenu'
import { ReportMenuType, ReportMenus } from '@/models/enums/ActionSheetType'
import { ReportType } from '@/models/enums/ReportType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { isCloseToBottom } from '@/services/InfiniteService'
import { getActionSheetTintColor } from '@/services/StyleService'
import { CategoryState, CommunityCategoryState } from '@/state/CategoryState'
import { colors } from '@/styles/colors'

import {
  Category,
  Container,
  ContentListContainer,
  CreateAt,
  InfoContainer,
  Nickname,
  ProfileContainer,
  ProfileImage,
  RowContainer,
  Scrap,
  ScrollContainer,
  Styles,
  Text,
  WidthContainer,
} from './ContentList.style'

interface ContentListProps {
  route: RouteProp<RootStackParamList, 'ContentList'>
}

const PAGE_LIMIT = 10

/**
 * ContentList
 */
const ContentList = ({ route }: ContentListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const actionSheetRef = useRef<ActionSheet>(null)
  const queryClient = useQueryClient()

  const [editModal, setEditModal] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isBlockDialogVisible, setIsBlockDialogVisible] = useState(false)
  const [isBlockCompleteDialogVisible, setIsBlockCompleteDialogVisible] = useState(false)
  const [ownerNickname, setOwnerNickname] = useState('')
  const [isProfileImageError, setIsProfileImageError] = useState(false)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)

  const currentCategory = useRecoilValue(CategoryState)
  const communityCurrentCategory = useRecoilValue(CommunityCategoryState)

  const {
    data: contentList,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useInfiniteQuery<ContentByArchivingResponse, AxiosError>(
    [`contentByArchiving`, route.params.id],
    ({ pageParam = 0 }) => getContentByArchiving(route.params.id, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) =>
        lastPage.contents.hasNext ? lastPage.contents.page + 1 : undefined,
      /**
       *
       */
      onError: () => {
        setErrorDialogVisible(true)
      },
    }
  )

  const { mutate: deleteArchivingMutate } = useMutation(deleteArchiving, {
    /**
     * deleteArchivingMutate 성공 시 홈 화면 리패치 후 홈 화면으로 이동합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
      queryClient.invalidateQueries(['getCommunityArchivingList'])
      queryClient.invalidateQueries(['getScrapArchivingList'])
      queryClient.invalidateQueries(['getPopularArchivings'])
      queryClient.invalidateQueries(['getUser'])
      navigation.navigate('BottomTab', { screen: 'Home' })
    },
  })

  const { mutate: postBlockMutate } = useMutation(
    () => postBlock(contentList?.pages[0].ownerId ?? -1),
    {
      /**
       * postBlockMutate 성공 시 차단 완료 다이얼로그를 띄웁니다.
       */
      onSuccess: (response) => {
        setOwnerNickname(response.nickname)
        setIsBlockCompleteDialogVisible(true)
      },
    }
  )

  const { mutate: scrapMutate } = useMutation(
    () =>
      patchScrapArchiving(!!contentList?.pages[0].isScrap, contentList?.pages[0].archivingId ?? -1),
    {
      /**
       * scrapMutate 성공 시, 현재 archiving을 업데이트 합니다.
       */
      onSuccess: () => {
        queryClient.invalidateQueries([`contentByArchiving`, route.params.id])
        queryClient.invalidateQueries(['getCommunityArchivingList', communityCurrentCategory])
        queryClient.invalidateQueries(['getScrapArchivingList', communityCurrentCategory])
      },
    }
  )

  /**
   * handleEdit
   */
  const handleEdit = () => {
    setEditModal(true)
  }

  /**
   * HandleRemove
   */
  const showDeleteDialog = () => {
    setIsDeleteDialogVisible(true)
  }

  /**
   *
   */
  const handleReport = () => {
    actionSheetRef.current?.show()
  }

  /**
   *
   */
  const handleCloseModal = () => {
    setEditModal(false)
  }

  /**
   *
   */
  const handleDelete = () => {
    contentList && deleteArchivingMutate(contentList.pages[0].archivingId)
  }

  const PopupMenuList = contentList?.pages[0].isMine
    ? ([
        { title: 'update', onClick: handleEdit },
        { title: 'remove', onClick: showDeleteDialog },
      ] as PopupMenu[])
    : undefined

  useEffect(() => {
    if (!isLoading) {
      queryClient.setQueryData(['contentByArchiving', route.params.id], contentList)
    }
  }, [contentList, isLoading])

  const throttledNextPage = throttle(fetchNextPage, 1000)

  /**
   * 무한스크롤 요청입니다.
   */
  const onEndReached = () => {
    if (hasNextPage) {
      throttledNextPage()
    }
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = (index: ReportMenuType) => {
    switch (index) {
      case ReportMenuType.reportThisContent: {
        navigation.navigate('Report', { id: route.params.id, type: ReportType.Archiving })
        break
      }
      case ReportMenuType.blockThisUser: {
        setIsBlockDialogVisible(true)
        break
      }
    }
  }

  /**
   * 해당 아카이빙을 스크랩합니다.
   */
  const handleScrap = () => {
    if (contentList !== undefined) {
      scrapMutate()
    }
  }

  /**
   * ListRenderItem
   */
  const renderItem: ListRenderItem<ContentCardInfo> = ({ item }) => {
    return (
      <ContentCard
        key={item.contentId}
        archivingId={route.params.id}
        contentId={item.contentId}
        contentTitle={item.contentTitle}
        contentType={item.contentType}
        contentCreatedAt={item.contentCreatedAt}
        link={item.link}
        imgUrl={item.imgUrl}
        tag={item.tag}
        tagCount={item.tagCount}
      />
    )
  }

  return (
    <>
      {isLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries([`contentByArchiving`, route.params.id])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      {!contentList?.pages[0].isMine && (
        <LinearGradient
          style={Styles.linearGradient}
          colors={[colors.yellow200, colors.white]}
        />
      )}
      <DefaultContainer>
        <DefaultHeader
          title={contentList?.pages[0].archivingTitle}
          PopupMenuList={PopupMenuList}
          onRightClick={handleReport}
        />
        {!contentList?.pages[0].isMine && (
          <WidthContainer>
            <RowContainer>
              <Category>
                <Text>{i18n.t(`${contentList?.pages[0].category}`)}</Text>
              </Category>
            </RowContainer>
            <ProfileContainer>
              <ProfileImage
                source={
                  isProfileImageError || !contentList?.pages[0].ownerProfileImgUrl
                    ? defaultImages.profile
                    : { uri: contentList.pages[0].ownerProfileImgUrl }
                }
                onError={() => setIsProfileImageError(true)}
                defaultSource={defaultImages.profile as ImageURISource}
              />
              <InfoContainer>
                <Nickname>{contentList?.pages[0].ownerNickname}</Nickname>
                <CreateAt>{contentList?.pages[0].createdAt}</CreateAt>
              </InfoContainer>
              <Scrap onPress={handleScrap}>
                {contentList?.pages[0].isScrap ? (
                  <ScrapFillIcon
                    width={30}
                    height={30}
                    color={'transparent'}
                  />
                ) : (
                  <ScrapIcon
                    width={30}
                    height={30}
                    color={colors.gray500}
                  />
                )}
              </Scrap>
            </ProfileContainer>
          </WidthContainer>
        )}
        <SwipeScreen direction={Directions.RIGHT}>
          {contentList?.pages[0].totalContentsCount === 0 ? (
            <Container>
              <EmptyItem
                textKey="emptyArchiving"
                marginTop={55}
              />
            </Container>
          ) : (
            <ScrollContainer
              bounces={false}
              showsVerticalScrollIndicator={false}
              onScrollEndDrag={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                  onEndReached()
                }
              }}
            >
              {contentList && (
                <ContentListContainer
                  scrollEnabled={false}
                  data={contentList.pages
                    .map((page: ContentByArchivingResponse) => page.contents.content)
                    .flat()}
                  numColumns={2}
                  renderItem={renderItem}
                />
              )}
            </ScrollContainer>
          )}
        </SwipeScreen>
      </DefaultContainer>

      <EditArchivingModal
        archivingId={route.params.id}
        onClose={handleCloseModal}
        isVisible={editModal}
      />
      <ActionSheet
        ref={actionSheetRef}
        options={ReportMenus()}
        cancelButtonIndex={0}
        tintColor={getActionSheetTintColor()}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
      <TwoButtonDialog
        isVisible={isDeleteDialogVisible}
        title="doYouWantDeleteThisArchiving"
        imageUrl={defaultImages.recycleBin}
        completeText="delete"
        onCancel={() => {
          setIsDeleteDialogVisible(false)
        }}
        onComplete={() => {
          setIsDeleteDialogVisible(false)
          handleDelete()
        }}
      />
      <TwoButtonDialog
        isVisible={isBlockDialogVisible}
        title="doYouWantBlockThisUser"
        description="youCanUnblockUserAnytime"
        completeText="block"
        onCancel={() => {
          setIsBlockDialogVisible(false)
        }}
        onComplete={() => {
          setIsBlockDialogVisible(false)
        }}
        onClose={(isComplete: boolean) => {
          isComplete && postBlockMutate()
        }}
      />
      <DefaultDialog
        isVisible={isBlockCompleteDialogVisible}
        title={i18n.t('blockComplete', { nickname: ownerNickname })}
        imageUrl={defaultImages.blockComplete}
        description={i18n.t('youCannotSeeBlockUserContents', { nickname: ownerNickname })}
        buttonText="backToCommunity"
        onClick={() => {
          setIsBlockCompleteDialogVisible(false)
          queryClient.invalidateQueries(['getCommunityArchivingList', communityCurrentCategory])
          queryClient.invalidateQueries(['getPopularArchivings'])
          queryClient.invalidateQueries(['getScrapArchivingList'])
          navigation.navigate('BottomTab', { screen: 'Community' })
        }}
      />
    </>
  )
}

export default ContentList
