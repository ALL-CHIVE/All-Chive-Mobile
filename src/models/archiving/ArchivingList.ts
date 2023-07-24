export interface ArchivingListResponse {
  [category: string]: ArchivingItem[] | []
}

export interface ArchivingItem {
  title: string
  contentCnt: number
}
