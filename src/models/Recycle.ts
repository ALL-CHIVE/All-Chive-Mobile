import { ArchivingListContent } from '@/models/Archiving'
import { SimpleContent } from '@/models/SimpleContent'

export interface RecyclesResponse {
  contents: SimpleContent[]
  archivings: ArchivingListContent[]
}

export interface DeleteRecyclesRequest {
  archivingIds: number[]
  contentIds: number[]
}
