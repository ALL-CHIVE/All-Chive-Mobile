import { ContentType } from './enums/ContentType'

export interface Content {
  id: string
  type: ContentType
  uri: string
  ogTag?: {
    image_url: string
    title: string
    description: string
  }
  tags: string[]
  memo: string
}
