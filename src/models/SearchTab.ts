import { ArchivingListContent } from './Archiving'

export interface SearchTabData {
  searchData: {
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
