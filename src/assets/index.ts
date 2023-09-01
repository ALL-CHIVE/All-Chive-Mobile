import { ImageSourcePropType } from 'react-native'

export interface Assets {
  [key: string]: ImageSourcePropType
}

export const defaultImages: Assets = {
  blockComplete: require('@/assets/images/block-complete.png'),
  communityBackground: require('@/assets/images/community-background.png'),
  content: require('@/assets/images/content.png'),
  emptyItem: require('@/assets/images/empty-item.png'),
  homeBackground: require('@/assets/images/home-background.png'),
  informationError: require('@/assets/images/information-error.png'),
  loading: require('@/assets/images/loading.png'),
  onBoarding1: require('@/assets/images/onboarding1.png'),
  onBoarding2: require('@/assets/images/onboarding2.png'),
  profile: require('@/assets/images/profile.png'),
  recycleBin: require('@/assets/images/recycle-bin.png'),
  reportComplete: require('@/assets/images/report-complete.png'),
  temporaryError: require('@/assets/images/temporary-error.png'),
  thumbnail: require('@/assets/images/thumbnail.png'),
  unblockComplete: require('@/assets/images/unblock-complete.png'),
}

export const defaultIcons: Assets = {
  photo: require('@/assets/icons/photo.png'),
  link: require('@/assets/icons/link.png'),
  linkUpload: require('@/assets/icons/link-upload.png'),
  pinFill: require('@/assets/icons/pin-fill.png'),
}

export const logo: Assets = {
  allchiveLogo: require('@/assets/logo/allchive.png'),
}
