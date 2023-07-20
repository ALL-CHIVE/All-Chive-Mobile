export interface ContentByArchivingResponse {
  contents: {
    content: [
      {
        contentId: number
        contentTitle: string
        contentType: string
        link: string
        imgUrl: string
        contentCreatedAt: string
        tag: string
        tagCount: number
      }
    ]
    page: number
    size: number
    hasNext: boolean
  }
  archivingTitle: string
  archivingId: number
  totalContentsCount: number
}
