import { ArchivingListContent } from './Archiving'
export interface SearchResponse {
  data: {
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
}

export interface KeywordResponse {
  data: {
    keyword: Keyword[]
  }
}

export interface Keyword {
  word: string
  latestSearchId: number
}
