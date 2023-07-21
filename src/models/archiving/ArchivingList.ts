export interface HomeArchivingList {
  content: ArchivingListContent[]
  page: number
  size: number
  hasNext: boolean
}

export interface ArchivingListContent {
  archivingId: number
  title: string
  imageUrl: string
  createdAt: string
  category: string
  imgCnt: number
  linkCnt: number
  scrapCnt: number
  markStatus: boolean
}

export interface ArchivingListResponse {
  [category: string]: ArchivingItem[]
}

export interface ArchivingItem {
  title: string
  contentCnt: number
}
