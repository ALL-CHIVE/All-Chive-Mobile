export interface ArchivingCategoryList {
  content: [
    {
      categoryId: number
      title: string
      imageUrl: string
      createdAt: string
      topic: string // 추후 topic list로 변경
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
