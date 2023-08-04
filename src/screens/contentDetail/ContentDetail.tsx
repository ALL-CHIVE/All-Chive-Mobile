import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { Text, SafeAreaView, ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { deleteContents, getContents } from '@/apis/content'
import { defaultImages } from '@/assets'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import Memo from '@/components/memo/Memo'
import Popup from '@/components/popup/Popup'
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
import { colors } from '@/styles/colors'

import { ContentDetailView, PreviewContainer, SubTitle, TagList } from './ContentDetail.style'
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

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isBlockDialogVisible, setIsBlockDialogVisible] = useState(false)
  const [isBlockCompleteDialogVisible, setIsBlockCompleteDialogVisible] = useState(false)

  const {
    isLoading,
    error,
    data: content,
  } = useQuery<GetContentsResponse, AxiosError>(queryKeys.contents, () =>
    getContents(route.params.id)
  )

  const { mutate: deleteContentMutate } = useMutation(deleteContents, {
    /**
     *
     */
    onSuccess: () => {
      navigation.goBack()
    },
    /**
     *
     */
    onError: (error: AxiosError) => {
      // console.log(error)
    },
  })

  /**
   * HandleEdit
   */
  const HandleEdit = () => {
    // TODO: edit 로직 추가
    switch (content?.contentType) {
      case ContentType.Link:
        navigation.navigate('Edit', { id: route.params.id, type: ContentType.Link })
        break
      case ContentType.Image:
        navigation.navigate('Edit', { id: route.params.id, type: ContentType.Image })
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

  const PopupMenuList: PopupMenu[] =
    content && content.isMine
      ? [
          { title: 'update', onClick: HandleEdit },
          { title: 'remove', onClick: showDeleteDialog },
        ]
      : [{ title: 'report', onClick: HandleReport }]

  useEffect(() => {
    navigation.setOptions({
      /**
       * custom header
       */
      header: ({ options }) => (
        <DefaultHeader
          title={content?.contentTitle}
          PopupMenuList={PopupMenuList}
          options={options}
        />
      ),
      title: content?.contentTitle,
      /**
       * popup
       */
      headerRight: () => <Popup menuList={PopupMenuList} />,
    })
  }, [])

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = (index: ReportMenuType) => {
    switch (index) {
      case ReportMenuType.reportThisContent: {
        navigation.navigate('Report', { id: route.params.id, type: ReportType.Content })
        break
      }
      case ReportMenuType.blockThisUser: {
        setIsBlockDialogVisible(true)
        break
      }
    }
  }

  return (
    <>
      <SafeAreaView>
        <ScrollView>
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
        </ScrollView>
      </SafeAreaView>
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
          isComplete && setIsBlockCompleteDialogVisible(true)
        }}
      />
      <DefaultDialog
        isVisible={isBlockCompleteDialogVisible}
        title={i18n.t('blockComplete', { nickname: '다카이브' })}
        imageUrl={defaultImages.blockComplete}
        description={i18n.t('youCannotSeeBlockUserContents', { nickname: '다카이브' })}
        buttonText="backToCommunity"
        onClick={() => {
          setIsBlockCompleteDialogVisible(false)
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
