import { GetAllKeys } from '@/extensions/enumExtensions'
import i18n from '@/locales'

export enum ProfileMenuType {
  cancel,
  selectDefaultImage,
  selectFromPhotoLibrary,
  selectFromCamera,
}

export enum ImageUploadMenuType {
  cancel,
  selectFromPhotoLibrary,
  selectFromCamera,
}

export enum ReportMenuType {
  cancel,
  reportThisContent,
  blockThisUser,
}

/**
 * ProfileMenus 를 반환합니다.
 */
export const ProfileMenus = () => GetAllKeys(ProfileMenuType).map((key: string) => i18n.t(key))

/**
 * ImageUploadMenus 를 반환합니다.
 */
export const ImageUploadMenus = () =>
  GetAllKeys(ImageUploadMenuType).map((key: string) => i18n.t(key))

/**
 * ReportMenus 를 반환합니다.
 */
export const ReportMenus = () => GetAllKeys(ReportMenuType).map((key: string) => i18n.t(key))
