import { GetAllKeys } from '@/extensions/enumExtensions'
import i18n from '@/locales'

export enum DefaultMenuType {
  cancel,
  selectDefaultImage,
  selectFromPhotoLibrary,
  selectFromCamera,
}

export enum ImageUploadMenuType {
  cancel,
  selectFromPhotoLibrary,
  selectFromFile,
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
export const ProfileMenus = () => GetAllKeys(DefaultMenuType).map((key: string) => i18n.t(key))

/**
 * ImageUploadMenus 를 반환합니다.
 */
export const ImageUploadMenus = () =>
  GetAllKeys(ImageUploadMenuType).map((key: string) => i18n.t(key))

/**
 * ReportMenus 를 반환합니다.
 */
export const ReportMenus = () => GetAllKeys(ReportMenuType).map((key: string) => i18n.t(key))
