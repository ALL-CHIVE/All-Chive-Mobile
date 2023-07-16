import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { ListRenderItem } from 'react-native'

import { getContentList } from '@/apis/fakeServerApis'
import { defaultImages } from '@/assets'
import ContentCard from '@/components/ContentCard/ContentCard'
import DefaultDialog from '@/components/dialogs/defaultDialog/DefaultDialog'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import DefaultHeader from '@/components/header/defaultHeader/DefaultHeader'
import Popup from '@/components/popup/Popup'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'
import { SimpleContent } from '@/models/SimpleContent'
import { ReportMenuType } from '@/models/enums/ActionSheetType'
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
  const isMine = false
  const [contentList, setContentList] = useState<SimpleContent[] | null>(null)
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

  useEffect(() => {
    getContentList(route.params.id).then((res) => setContentList(res))
    navigation.setOptions({
      /**
       * custom header
       */
      header: ({ options }) => (
        <DefaultHeader
          navigation={navigation}
          title={route.params.title}
          PopupMenuList={PopupMenuList}
          options={options}
        />
      ),
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
   *
   */
  const renderItem: ListRenderItem<SimpleContent> = ({ item }) => {
    return (
      <ContentCard
        id={item.id}
        title={item.title}
        day={item.createdAt}
        imageUrl={item.imageUrl}
        tags={item.tags}
        type={item.type}
      />
    )
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

  return (
    <>
      <Container>
        {contentList && (
          <ContentListContainer
            scrollEnabled={false}
            data={contentList}
            numColumns={2}
            renderItem={renderItem}
          />
        )}
      </Container>
      <ActionSheet
        ref={actionSheetRef}
        options={options}
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

const options = [i18n.t('cancel'), i18n.t('reportThisContent'), i18n.t('blockThisUser')]

export default ContentList
