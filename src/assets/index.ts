import { ImageSourcePropType } from 'react-native'

export interface Assets {
  [key: string]: ImageSourcePropType
}

export const defaultImages: Assets = {
  profile: require('@/assets/default/profile.png'),
  onBoarding1: require('@/assets/default/onboarding1.png'),
  onBoarding2: require('@/assets/default/onboarding2.png'),
  reportComplete: require('@/assets/default/reportComplete.png'),
  thumbnail: require('@/assets/default/thumbnail.png'),
  blockComplete: require('@/assets/default/blockComplete.png'),
  homeBackground: require('@/assets/default/homeBackground.png'),
  recycleBin: require('@/assets/default/recycleBin.png'),
  communityBackground: require('@/assets/default/community_background.png'),
  emptyItem: require('@/assets/default/emptyItem.png'),
  unblockComplete: require('@/assets/default/unblockComplete.png'),
  content: require('@/assets/default/content.png'),
  loading: require('@/assets/default/loading.png'),
  error: require('@/assets/default/error.png'),
  contentListBackground: require('@/assets/default/contentlist_background.png'),
}

export const defaultIcons: Assets = {
  photo: require('@/assets/icons/photo.png'),
  link: require('@/assets/icons/link.png'),
  linkUpload: require('@/assets/icons/link_upload.png'),
  pinFill: require('@/assets/icons/pinFill.png'),
}

export const logo: Assets = {
  allchiveLogo: require('@/assets/logo/allchiveLogo.png'),
}
