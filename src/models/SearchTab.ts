import { ArchivingListContent } from './Archiving'

export interface SearchTabData {
  searchData: {
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
