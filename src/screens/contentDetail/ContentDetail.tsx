import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { Text, SafeAreaView, ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getContent } from '@/apis/fakeServerApis'
import { defaultImages } from '@/assets'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import Memo from '@/components/memo/Memo'
import Popup from '@/components/popup/Popup'
import Tag from '@/components/tag/Tag'
import i18n from '@/locales'
import { Content } from '@/models/Content'
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
  const contentId = 'test'
  const contentType = ContentType.Image
  const contentTitle = '제목제목'
  const isMine = false
  const actionSheetRef = useRef<ActionSheet>(null)
  const [isBlockDialogVisible, setIsBlockDialogVisible] = useState(false)
  const [isBlockCompleteDialogVisible, setIsBlockCompleteDialogVisible] = useState(false)

  /**
   * HandleEdit
   */
  const HandleEdit = () => {
    // TODO: edit 로직 추가
    console.log('edit content')
  }

  /**
   * HandleRemove
   */
  const HandleRemove = () => {
    // TODO: remove 로직 추가
    console.log('remove content')
  }

  /**
   *
   */
  const HandleReport = () => {
    actionSheetRef.current?.show()
  }

  const PopupMenuList: PopupMenu[] = isMine
    ? [
        { title: 'update', onClick: HandleEdit },
        { title: 'remove', onClick: HandleRemove },
      ]
    : [{ title: 'report', onClick: HandleReport }]

  const {
    isLoading,
    error,
    data: content,
  } = useQuery<Content, AxiosError>(queryKeys.contents, () => getContent(contentId, contentType))

  useEffect(() => {
    navigation.setOptions({
      /**
       * custom header
       */
      header: ({ options }) => (
        <DefaultHeader
          title={contentTitle}
          PopupMenuList={PopupMenuList}
          options={options}
        />
      ),
      title: contentTitle,
      /**
       * popup
       */
      headerRight: () => (
        <Popup
          icon=""
          menuList={PopupMenuList}
        />
      ),
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
          {isLoading && <Text>loading</Text>}
          {error && <Text>error</Text>}
          {content && (
            <ContentDetailView>
              <PreviewContainer>{getContentDetail(content)}</PreviewContainer>
              <SubTitle>{i18n.t('tag')}</SubTitle>
              <TagList>
                {content.tags.map((tag) => (
                  <Tag
                    key={tag}
                    tag={tag}
                  />
                ))}
              </TagList>
              <SubTitle>{i18n.t('memo')}</SubTitle>
              <Memo text={content.memo} />
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
const getContentDetail = (content: Content) => {
  switch (content?.type) {
    case ContentType.Link:
      return <LinkDetail content={content} />
    case ContentType.Image:
      return <ImageDetail content={content} />
    default:
      throw new Error('unknown content type')
  }
}

export default ContentDetail
