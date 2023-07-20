import { Tag } from '../tag/Tag'

export interface GetContentsResponse {
  contentId: number
  contentTitle: string
  contentType: string
  link: string
  imgUrl: string
  contentCreatedAt: string
  tagList: Tag[]
  isMine: boolean
  memo: string
}
