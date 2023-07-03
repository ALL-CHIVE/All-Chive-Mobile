import React from 'react'

import { AxiosError } from 'axios'
import { Text, SafeAreaView, ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getContent } from '@/apis/fakeServerApis'
import Memo from '@/components/memo/Memo'
import Tag from '@/components/tag/Tag'
import { Content } from '@/models/Content'
import { ContentType } from '@/models/enums/ContentType'
import { queryKeys } from '@/queries/queryKeys'

import { ContentDetailView, PreviewContainer, SubTitle, TagList } from './ContentDetail.style'
import ImageDetail from './components/imageDetail/ImageDetail'
import LinkDetail from './components/linkDetail/LinkDetail'

//TODO: props 연결
interface ContentDetailProps {
  contentId: string
  contentType: ContentType
}

/**
 * ContentDetail
 */
const ContentDetail = (/*{ contentId, contentType }: ContentDetailProps*/) => {
  const contentId = 'test'
  const contentType = ContentType.Link

  const {
    isLoading,
    error,
    data: content,
  } = useQuery<Content, AxiosError>(queryKeys.contents, () => getContent(contentId, contentType))

  return (
    <SafeAreaView>
      <ScrollView>
        {isLoading && <Text>loading</Text>}
        {error && <Text>error</Text>}
        {content && (
          <ContentDetailView>
            <PreviewContainer>{getContentDetail(content)}</PreviewContainer>
            <SubTitle>태그</SubTitle>
            <TagList>
              {content.tags.map((tag) => (
                <Tag
                  key={tag}
                  tag={tag}
                />
              ))}
            </TagList>
            <SubTitle>메모</SubTitle>
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
