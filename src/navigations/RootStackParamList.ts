import { ContentType } from '@/models/enums/ContentType'
import { ReportType } from '@/models/enums/ReportType'

import { BottomTabNavigationParams } from './bottomTab/BottomTab'

export type RootStackParamList = {
  OnBoarding: undefined
  Agreement: undefined
  SelectCategory: SelectCategoryParams
  AddProfile: AddProfileParams
  BottomTab: BottomTabNavigationParams
  Login: undefined
  ContentList: ContentListParams
  Upload: UploadParams
  CreateTag: undefined
  ContentDetail: ContentDetailParams
  Report: ReportParams
  Search: undefined
  Edit: EditParams
  Mypage: undefined
  MyAccount: undefined
  ArchivingManagement: undefined
  TagManagement: undefined
  BlockManagement: undefined
  Notice: undefined
  RecycleBin: undefined
}

interface SelectCategoryParams {
  marketingAgreement: boolean
}

interface AddProfileParams {
  categories: string[]
  marketingAgreement: boolean
}

interface ContentListParams extends DefaultParams {
  title: string
}

interface UploadParams {
  type: ContentType
  data?: string
}

interface ContentDetailParams {
  archivingId: number
  contentId: number
  isFromUpload: boolean
}

interface ReportParams extends DefaultParams {
  type: ReportType
}

interface EditParams extends DefaultParams {
  type: ContentType
}

interface DefaultParams {
  id: number
}
