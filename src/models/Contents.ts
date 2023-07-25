import { Tag } from './Tag'

export interface GetContentsResponse {
  contentId: number
  contentTitle: string
  contentType: string
  contentMemo: string
  link: string
  imgUrl: string
  contentCreatedAt: string
  tagList: Tag[]
  isMine: boolean
}
