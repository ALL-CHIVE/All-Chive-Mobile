import contentImage from '@/data/contentImage.json'
import contentLink from '@/data/contentLink.json'
import { Content } from '@/models/Content'
import { ContentType } from '@/models/enums/ContentType'

/**
 * 콘텐츠를 가져옵니다.
 */
export const getContent = async (id: string, type: ContentType): Promise<Content> => {
  const json = JSON.stringify(type === ContentType.Image ? contentImage : contentLink)
  const result: Content = JSON.parse(json)
  return result
}
