import { ArchivingInfo } from '@/models/Archiving'
import { ContentCardInfo } from '@/models/ContentCard'

export interface RecyclesResponse {
  contents: ContentCardInfo[]
  archivings: ArchivingInfo[]
}

export interface DeleteRecyclesRequest {
  archivingIds: number[]
  contentIds: number[]
}

export interface RecycleBinTabProps {
  contents: RecyclesResponse['contents']
  archivings: RecyclesResponse['archivings']
  editMode: boolean
}
