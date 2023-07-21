export interface CommunityArchivingListResponse {
  content: [
    {
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
  ]
  page: number
  size: number
  hasNext: boolean
}
