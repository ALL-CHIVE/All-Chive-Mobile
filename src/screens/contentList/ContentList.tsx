import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { Image, ImageURISource, ListRenderItem, NativeScrollEvent } from 'react-native'
import Config from 'react-native-config'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { deleteArchiving, getContentByArchiving, patchScrapArchiving } from '@/apis/archiving'
import { postBlock } from '@/apis/block'
import { defaultIcons, defaultImages } from '@/assets'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import { EditArchivingModal } from '@/components/modal/archivingModal/editArchivingModal/EditArchivingModal'
import i18n from '@/locales'
import { ContentByArchivingResponse } from '@/models/Archiving'
import { PopupMenu } from '@/models/PopupMenu'
import { SimpleContent } from '@/models/SimpleContent'
import { ReportMenuType, ReportMenus } from '@/models/enums/ActionSheetType'
import { ReportType } from '@/models/enums/ReportType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { CommunityCategoryState } from '@/state/CategoryState'
import { colors } from '@/styles/colors'

import {
  Category,
  ContentListContainer,
  CreateAt,
  HeaderContainer,
  Nickname,
  ProfileContainer,
  ProfileImage,
  Scrap,
  ScrollContainer,
  Text,
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

  const currentCategory = useRecoilValue(CommunityCategoryState)

  const {
    data: contentList,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<ContentByArchivingResponse, AxiosError>(
    [`contentByArchiving${route.params.id}`, route.params.id],
    ({ pageParam = 0 }) => getContentByArchiving(route.params.id, pageParam, PAGE_LIMIT),
    {
      /**
       * getNextPageParam
       */
      getNextPageParam: (lastPage) =>
        lastPage.contents.hasNext ? lastPage.contents.page + 1 : undefined,
    }
  )

  const { mutate: deleteArchivingMutate } = useMutation(deleteArchiving, {
    /**
     * deleteArchivingMutate 성공 시 홈 화면 리패치 후 홈 화면으로 이동합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getHomeArchivingList', 'ALL'])
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
      /**
       *
       */
      onError: () => {
        //ignore
      },
    }
  )

  const { mutate: scrapMutate } = useMutation(
    () => patchScrapArchiving(contentList!.pages[0].isScrap, contentList!.pages[0].archivingId),
    {
      /**
       * scrapMutate 성공 시, 현재 archiving을 업데이트 합니다.
       */
      onSuccess: () => {
        queryClient.invalidateQueries([`contentByArchiving${route.params.id}`, route.params.id])
        queryClient.invalidateQueries(['getCommunityArchivingList', currentCategory])
        queryClient.invalidateQueries(['getScrapArchivingList', currentCategory])
      },
    }
  )

  /**
   * handleEdit
   */
  const handleEdit = () => {
    // TODO: edit 로직 추가
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

  /**
   * 무한스크롤 요청입니다.
   */
  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage()
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

  return (
    <>
      <HeaderContainer>
        <DefaultHeader
          title={contentList?.pages[0].archivingTitle}
          PopupMenuList={PopupMenuList}
          onRightClick={handleReport}
        />
      </HeaderContainer>
      {!contentList?.pages[0].isMine && (
        <>
          <Category>
            <Text>{contentList?.pages[0].category}</Text>
          </Category>
          <ProfileContainer>
            <ProfileImage
              source={
                isProfileImageError || !contentList?.pages[0].ownerProfileImgUrl
                  ? defaultImages.profile
                  : {
                      uri: `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${contentList?.pages[0].ownerProfileImgUrl}`,
                    }
              }
              onError={() => setIsProfileImageError(true)}
              defaultSource={defaultImages.profile as ImageURISource}
            />
            <Nickname>{contentList?.pages[0].ownerNickname}</Nickname>
            {/* TODO: CreateAt 추가 */}
            <Scrap onPress={handleScrap}>
              {contentList?.pages[0].isScrap ? (
                <Image source={defaultIcons.scrapFill} />
              ) : (
                <Image source={defaultIcons.scrap} />
              )}
            </Scrap>
          </ProfileContainer>
        </>
      )}
      <DefaultContainer>
        <ScrollContainer
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
        tintColor={colors.gray600}
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
          queryClient.invalidateQueries(['getCommunityArchivingList', 'ALL'])
          navigation.navigate('BottomTab', { screen: 'Community' })
        }}
      />
    </>
  )
}

/**
 * ListRenderItem
 */
const renderItem: ListRenderItem<SimpleContent> = ({ item }) => {
  return (
    <ContentCard
      key={item.contentId}
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

export default ContentList

/**
 * isCloseToBottom
 */
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
  const paddingToBottom = 600
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
}
