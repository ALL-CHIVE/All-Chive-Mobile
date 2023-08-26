import { ContentCardInfo } from './ContentCard'
import { Category } from './enums/Category'

export interface ArchivingListResponse {
  [category: string]: ArchivingItem[] | []
}

export interface ArchivingItem {
  archivingId: number
  title: string
  contentCnt: number
}

export interface ContentByArchivingResponse {
  contents: {
    content: ContentCardInfo[]
    page: number
    size: number
    hasNext: boolean
  }
  archivingTitle: string
  category: Category
  archivingId: number
  createdAt: string
  totalContentsCount: number
  ownerId: number
  ownerNickname: string
  ownerProfileImgUrl: string
  isMine: boolean
  isScrap: boolean
}

export interface MainArchivingListResponse {
  content: ArchivingInfo[]
  page: number
  size: number
  hasNext: boolean
}

export interface ArchivingInfo {
  archivingId: number
  title: string
  imageUrl: string
  createdAt: string
  category: string
  imgCnt: number
  linkCnt: number
  scrapCnt: number
  markStatus: boolean
  publicStatus: boolean
}

export interface PopularArchivingsResponse {
  archivings: ArchivingInfo[]
}
