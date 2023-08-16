import { ArchivingListContent } from './Archiving'
export interface SearchResponse {
  data: {
    archivings: {
      content: ArchivingListContent[]
      page: number
      size: number
      totalElements: number
      totalPages: number
      hasNextPage: boolean
    }
    community: {
      content: ArchivingListContent[]
      page: number
      size: number
      totalElements: number
      totalPages: number
      hasNextPage: boolean
    }
  }
}

export interface KeywordResponse {
  data: {
    keyword: string[]
  }
}

export interface KeywordsResponse {
  data: {
    keywords: Keywords[]
  }
}

export interface Keywords {
  word: string
  latestSearchId: number
}
