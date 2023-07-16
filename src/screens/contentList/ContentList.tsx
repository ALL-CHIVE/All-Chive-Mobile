import React, { useEffect, useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { ListRenderItem } from 'react-native'

import { getContentList } from '@/apis/fakeServerApis'
import ContentCard from '@/components/ContentCard/ContentCard'
import DefaultHeader from '@/components/header/defaultHeader/DefaultHeader'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { SimpleContent } from '@/models/SimpleContent'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'

import { Container, ContentListContainer } from './ContentList.style'

interface ContentListProps {
  route: RouteProp<RootStackParamList, 'ContentList'>
}

/**
 * ContentList
 */
const ContentList = ({ route }: ContentListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const isMine = true
  const [contentList, setContentList] = useState<SimpleContent[] | null>(null)

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
    // TODO: report 로직 추가
    console.log('report content')
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

  return (
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
  )
}

export default ContentList
