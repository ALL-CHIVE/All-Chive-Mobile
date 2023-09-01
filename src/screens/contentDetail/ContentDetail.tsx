import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { postBlock } from '@/apis/block/Block'
import { deleteContents, getContents } from '@/apis/content/Content'
import { defaultImages } from '@/assets'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import { Loading } from '@/components/loading/Loading'
import Memo from '@/components/memo/Memo'
import { SwipeScreen } from '@/components/swipe/SwipeScreen'
import { BigWhiteTag } from '@/components/tag/whiteTag/bigWhiteTag/BigWhiteTag'
import i18n from '@/locales'
import { GetContentsResponse } from '@/models/Contents'
import { PopupMenu } from '@/models/PopupMenu'
import { ReportMenuType, ReportMenus } from '@/models/enums/ActionSheetType'
import { ContentType } from '@/models/enums/ContentType'
import { ReportType } from '@/models/enums/ReportType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { queryKeys } from '@/queries/queryKeys'
import { getActionSheetTintColor } from '@/services/StyleService'

import {
  Container,
  ContentDetailView,
  Day,
  PreviewContainer,
  SubTitle,
  TagList,
} from './ContentDetail.style'
import ImageDetail from './components/imageDetail/ImageDetail'
import LinkDetail from './components/linkDetail/LinkDetail'

interface ContentDetailProps {
  route: RouteProp<RootStackParamList, 'ContentDetail'>
}

/**
 * ContentDetail
 */
const ContentDetail = ({ route }: ContentDetailProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const actionSheetRef = useRef<ActionSheet>(null)
  const queryClient = useQueryClient()

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isBlockDialogVisible, setIsBlockDialogVisible] = useState(false)
  const [isBlockCompleteDialogVisible, setIsBlockCompleteDialogVisible] = useState(false)
  const [ownerNickname, setOwnerNickname] = useState('')
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)

  const { data: content, isLoading } = useQuery<GetContentsResponse, AxiosError>(
    [queryKeys.contents, route.params.contentId],
    () => getContents(route.params.contentId),
    {
      /**
       *
       */
      onError: () => {
        setErrorDialogVisible(true)
      },
    }
  )

  useEffect(() => {
    queryClient.setQueryData([queryKeys.contents, route.params.contentId], content)
  }, [])

  /**
   * 화면 이동을 handle합니다.
   */
  const handleNavigation = () => {
    if (route.params.isFromUpload) {
      navigation.navigate('BottomTab', { screen: 'Home' })
    } else {
      navigation.goBack()
    }
  }

  const { mutate: deleteContentMutate } = useMutation(deleteContents, {
    /**
     *
     */
    onSuccess: () => {
      queryClient.invalidateQueries([`contentByArchiving`, route.params.archivingId])
      queryClient.invalidateQueries([`contentByArchiving`])
      queryClient.invalidateQueries([`getHomeArchivingList`])
      handleNavigation()
    },
  })

  const { mutate: postBlockMutate } = useMutation(() => postBlock(content?.ownerId ?? -1), {
    /**
     * postBlockMutate 성공 시 차단 완료 다이얼로그를 띄웁니다.
     */
    onSuccess: (response) => {
      setOwnerNickname(response.nickname)
      setIsBlockCompleteDialogVisible(true)
    },
  })

  /**
   * HandleEdit
   */
  const HandleEdit = () => {
    switch (content?.contentType) {
      case ContentType.Link:
        navigation.navigate('Edit', { id: route.params.contentId, type: ContentType.Link })
        break
      case ContentType.Image:
        navigation.navigate('Edit', { id: route.params.contentId, type: ContentType.Image })
        break
    }
  }

  /**
   * showDeleteDialog
   */
  const showDeleteDialog = () => {
    setIsDeleteDialogVisible(true)
  }

  /**
   *
   */
  const HandleReport = () => {
    actionSheetRef.current?.show()
  }

  /**
   *
   */
  const handleDelete = () => {
    if (content !== undefined) {
      deleteContentMutate(content.contentId)
    }
  }

  const PopupMenuList =
    content && content.isMine
      ? ([
          { title: 'update', onClick: HandleEdit },
          { title: 'remove', onClick: showDeleteDialog },
        ] as PopupMenu[])
      : undefined

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = (index: ReportMenuType) => {
    switch (index) {
      case ReportMenuType.reportThisContent: {
        navigation.navigate('Report', { id: route.params.contentId, type: ReportType.Content })
        break
      }
      case ReportMenuType.blockThisUser: {
        setIsBlockDialogVisible(true)
        break
      }
    }
  }

  if (!content) {
    return <></>
  }

  return (
    <>
      {isLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries([queryKeys.contents, route.params.contentId])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      <DefaultContainer>
        <DefaultHeader
          title={content.contentTitle}
          PopupMenuList={PopupMenuList}
          onRightClick={HandleReport}
          navigate={handleNavigation}
        />
        <DefaultScrollContainer>
          <SwipeScreen
            direction={1}
            wentToGo={handleNavigation}
          >
            <Container>
              <Day>{content.contentCreatedAt}</Day>
              {content && (
                <ContentDetailView>
                  <PreviewContainer>{getContentDetail(content)}</PreviewContainer>
                  {content.tagList?.length > 0 && (
                    <>
                      <SubTitle>{i18n.t('tag')}</SubTitle>
                      <TagList>
                        {content.tagList.map((tag) => (
                          <BigWhiteTag
                            key={tag.tagId}
                            tag={tag.name}
                          />
                        ))}
                      </TagList>
                    </>
                  )}
                  {content.contentMemo && (
                    <>
                      <SubTitle>{i18n.t('memo')}</SubTitle>
                      <Memo text={content.contentMemo} />
                    </>
                  )}
                </ContentDetailView>
              )}
            </Container>
          </SwipeScreen>
        </DefaultScrollContainer>
      </DefaultContainer>

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
        title="doYouWantDeleteThisContent"
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
          queryClient.invalidateQueries(['getCommunityArchivingList'])
          queryClient.invalidateQueries(['getPopularArchivings'])
          queryClient.invalidateQueries(['getScrapArchivingList'])
          navigation.navigate('BottomTab', { screen: 'Community' })
        }}
      />
    </>
  )
}

/**
 * content detail을 가져옵니다.
 */
const getContentDetail = (content: GetContentsResponse) => {
  switch (content?.contentType) {
    case ContentType.Link:
      return <LinkDetail content={content} />
    case ContentType.Image:
      return <ImageDetail content={content} />
    default:
      throw new Error('unknown content type')
  }
}

export default ContentDetail
