export interface HomeArchivingList {
  content: [
    {
      categoryId: number
      title: string
      imageUrl: string
      createdAt: string
      subject: string
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
