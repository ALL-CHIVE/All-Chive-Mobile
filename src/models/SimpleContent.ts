import { ContentType } from './enums/ContentType'

export interface SimpleContent {
  id: string
  title: string
  imageUrl: string
  createdAt: string
  tags: string[]
  type: ContentType
}
