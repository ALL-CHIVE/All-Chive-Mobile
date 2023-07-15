import React, { useEffect } from 'react'

import { AxiosError } from 'axios'
import { Text, SafeAreaView, ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getContent } from '@/apis/fakeServerApis'
import DefaultHeader from '@/components/header/defaultHeader/DefaultHeader'
import Memo from '@/components/memo/Memo'
import Popup from '@/components/popup/Popup'
import Tag from '@/components/tag/Tag'
import i18n from '@/locales'
import { Content } from '@/models/Content'
import { PopupMenu } from '@/models/PopupMenu'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { queryKeys } from '@/queries/queryKeys'

import { ContentDetailView, PreviewContainer, SubTitle, TagList } from './ContentDetail.style'
import ImageDetail from './components/imageDetail/ImageDetail'
import LinkDetail from './components/linkDetail/LinkDetail'

//TODO: props 연결
interface ContentDetailProps {
  // contentId: string
  // contentType: ContentType
  navigation: MainNavigationProp
}

/**
 * ContentDetail
 */
const ContentDetail = ({ navigation }: ContentDetailProps) => {
  const contentId = 'test'
  const contentType = ContentType.Image
  const contentTitle = '제목제목'
  const isMine = true

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
        { title: 'fix', onClick: HandleEdit },
        { title: 'delete', onClick: HandleRemove },
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
          navigation={navigation}
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

  return (
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
