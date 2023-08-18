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
  selectFromCamera,
}

export enum ReportMenuType {
  cancel,
  reportThisContent,
  blockThisUser,
}

export enum EditDeleteMenuType {
  cancel,
  update,
  remove,
}

/**
 * DefaultMenus 를 반환합니다.
 */
export const DefalutMenus = () => GetAllKeys(DefaultMenuType).map((key: string) => i18n.t(key))

/**
 * ImageUploadMenus 를 반환합니다.
 */
export const ImageUploadMenus = () =>
  GetAllKeys(ImageUploadMenuType).map((key: string) => i18n.t(key))

/**
 * ReportMenus 를 반환합니다.
 */
export const ReportMenus = () => GetAllKeys(ReportMenuType).map((key: string) => i18n.t(key))

/**
 * EditDeleteMenus 를 반환합니다.
 */
export const EditDeleteMenus = () =>
  GetAllKeys(EditDeleteMenuType).map((key: string) => i18n.t(key))
