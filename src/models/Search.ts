import { ArchivingListContent } from './archiving/MainArchivingList'

export interface SearchResponse {
  archivings: {
    content: ArchivingListContent[]
    page: number
    size: number
    hasNext: boolean
  }
  community: {
    content: ArchivingListContent[]
    page: number
    size: number
    hasNext: boolean
  }
}

export interface KeywordResponse {
  data: {
    keyword: string[]
  }
}
