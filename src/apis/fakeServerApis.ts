import contentList from '@/data/contentList.json'
import { SimpleContent } from '@/models/SimpleContent'

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
