import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { postBlock } from '@/apis/block'
import { deleteContents, getContents } from '@/apis/content'
import { defaultImages } from '@/assets'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import { Loading } from '@/components/loading/Loading'
import Memo from '@/components/memo/Memo'
import { WhiteTag } from '@/components/tag/whiteTag/WhiteTag'
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

  const {
    isLoading,
    isError,
    data: content,
  } = useQuery<GetContentsResponse, AxiosError>([queryKeys.contents, route.params.contentId], () =>
    getContents(route.params.contentId)
  )

  useEffect(() => {
    queryClient.setQueryData([queryKeys.contents, route.params.contentId], content)
  }, [])

  const { mutate: deleteContentMutate } = useMutation(deleteContents, {
    /**
     *
     */
    onSuccess: () => {
      queryClient.invalidateQueries([`contentByArchiving`, route.params.archivingId])
      navigation.goBack()
      queryClient.invalidateQueries([`contentByArchiving`])
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
    /**
     *
     */
    onError: () => {
      //ignore
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
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries([queryKeys.contents, route.params.contentId])
        }}
      />
      <DefaultContainer>
        <DefaultHeader
          title={content.contentTitle}
          PopupMenuList={PopupMenuList}
          onRightClick={HandleReport}
        />
        <DefaultScrollContainer>
          <Container>
            <Day>{content.contentCreatedAt}</Day>
            {/* {isLoading && <Text>loading</Text>}
          {error && <Text>error</Text>} */}
            {content && (
              <ContentDetailView>
                <PreviewContainer>{getContentDetail(content)}</PreviewContainer>
                <SubTitle>{i18n.t('tag')}</SubTitle>
                <TagList>
                  {content.tagList.map((tag) => (
                    <WhiteTag
                      key={tag.tagId}
                      tag={tag.name}
                    />
                  ))}
                </TagList>
                <SubTitle>{i18n.t('memo')}</SubTitle>
                <Memo text={content.contentMemo} />
              </ContentDetailView>
            )}
          </Container>
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
