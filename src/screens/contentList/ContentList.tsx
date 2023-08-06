import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import { ListRenderItem } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { deleteArchiving, getContentByArchiving } from '@/apis/archiving'
import { defaultImages } from '@/assets'
import ContentCard from '@/components/cards/contentCard/ContentCard'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/headers/defaultHeader/DefaultHeader'
import { EditArchivingModal } from '@/components/modal/archivingModal/editArchivingModal/EditArchivingModal'
import Popup from '@/components/popup/Popup'
import i18n from '@/locales'
import { ContentByArchivingResponse } from '@/models/Archiving'
import { PopupMenu } from '@/models/PopupMenu'
import { SimpleContent } from '@/models/SimpleContent'
import { ReportMenuType, ReportMenus } from '@/models/enums/ActionSheetType'
import { ReportType } from '@/models/enums/ReportType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { colors } from '@/styles/colors'

import { Container, ContentListContainer } from './ContentList.style'

interface ContentListProps {
  route: RouteProp<RootStackParamList, 'ContentList'>
}

/**
 * ContentList
 */
const ContentList = ({ route }: ContentListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const [contentCard, setContentCard] = useState<SimpleContent[] | null>(null)
  const [editModal, setEditModal] = useState(false)
  const actionSheetRef = useRef<ActionSheet>(null)

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const [isBlockDialogVisible, setIsBlockDialogVisible] = useState(false)
  const [isBlockCompleteDialogVisible, setIsBlockCompleteDialogVisible] = useState(false)

  const { data: contentList } = useQuery<ContentByArchivingResponse, AxiosError>(
    ['contentByArchiving', route.params.id],
    () => getContentByArchiving(route.params.id)
  )

  const { mutate: deleteArchivingMutate } = useMutation(deleteArchiving, {
    /**
     *
     */
    onSuccess: () => {
      navigation.navigate('BottomTab', { screen: 'Home' })
    },
    /**
     *
     */
    onError: (error: AxiosError) => {
      // console.log(error)
    },
  })

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
    contentList && deleteArchivingMutate(contentList.archivingId)
  }

  const PopupMenuList: PopupMenu[] = contentList?.isMine
    ? [
        { title: 'update', onClick: handleEdit },
        { title: 'remove', onClick: showDeleteDialog },
      ]
    : [{ title: 'report', onClick: handleReport }]

  useEffect(() => {
    // getContentByArchiving(route.params.id).then((res) => setContentCard(res.contents.content))
    contentList?.contents && setContentCard(contentList.contents.content)
  }, [])

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

  return (
    <>
      <DefaultContainer>
        <DefaultHeader
          title={route.params.title}
          PopupMenuList={PopupMenuList}
        />
        <DefaultScrollContainer>
          <Container>
            {contentList && (
              <ContentListContainer
                scrollEnabled={false}
                data={contentCard}
                numColumns={2}
                renderItem={renderItem}
              />
            )}
          </Container>
        </DefaultScrollContainer>
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
