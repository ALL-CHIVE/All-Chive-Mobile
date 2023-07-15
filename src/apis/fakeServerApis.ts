import contentImage from '@/data/contentImage.json'
import contentLink from '@/data/contentLink.json'
import contentList from '@/data/contentList.json'
import { Content } from '@/models/Content'
import { SimpleContent } from '@/models/SimpleContent'
import { ContentType } from '@/models/enums/ContentType'

/**
 * 콘텐츠를 가져옵니다.
 */
export const getContent = async (id: string, type: ContentType): Promise<Content> => {
  const json = JSON.stringify(type === ContentType.Image ? contentImage : contentLink)
  const result: Content = JSON.parse(json)
  return result
}

/**
 * getHasAutoSignInSession
 */
export const getHasAutoSignInSession = async (token?: string) => {
  return false
}

/**
 * 콘텐츠 리스트를 가져옵니다.
 */
export const getContentList = async (id: number): Promise<SimpleContent[]> => {
  const json = JSON.stringify(contentList)
  const result: SimpleContent[] = JSON.parse(json)
  return result
}
