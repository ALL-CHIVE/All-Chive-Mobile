export interface HomeArchivingListResponse {
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
