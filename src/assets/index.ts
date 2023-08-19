import { ImageSourcePropType } from 'react-native'

export interface Assets {
  [key: string]: ImageSourcePropType
}

export const defaultImages: Assets = {
  profile: require('@/assets/default/profile.png'),
  onBoarding1: require('@/assets/default/onboarding1.png'),
  onBoarding2: require('@/assets/default/onboarding2.png'),
  uploadBottomSheet: require('@/assets/default/uploadBottomSheet.png'),
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
}

export const defaultIcons: Assets = {
  secondIndicator: require('@/assets/icons/secondIndicator.png'),
  check: require('@/assets/icons/check.png'),
  archiving: require('@/assets/icons/archiving.png'),
  archivingFocus: require('@/assets/icons/archiving_focus.png'),
  community: require('@/assets/icons/community.png'),
  communityFocus: require('@/assets/icons/community_focus.png'),
  upload: require('@/assets/icons/upload.png'),
  design: require('@/assets/icons/design.png'),
  food: require('@/assets/icons/food.png'),
  home_living: require('@/assets/icons/homeLiving.png'),
  life: require('@/assets/icons/life.png'),
  self_improvement: require('@/assets/icons/selfImprovement.png'),
  shopping: require('@/assets/icons/shopping.png'),
  sport: require('@/assets/icons/sport.png'),
  tech: require('@/assets/icons/tech.png'),
  trend: require('@/assets/icons/trend.png'),
  xMark: require('@/assets/icons/gray_closeButton.png'),
  whiteCloseButton: require('@/assets/icons/white_closeButton.png'),
  back: require('@/assets/icons/back.png'),
  search: require('@/assets/icons/search.png'),
  photo: require('@/assets/icons/photo.png'),
  link: require('@/assets/icons/link.png'),
  popup: require('@/assets/icons/popup.png'),
  photoWhite: require('@/assets/icons/photoWhite.png'),
  rightButton: require('@/assets/icons/rightButton.png'),
  pencil: require('@/assets/icons/pencil.png'),
  scrap: require('@/assets/icons/scrap.png'),
  scrapFill: require('@/assets/icons/scrap_fill.png'),
  yellowCheck: require('@/assets/icons/yellowCheck.png'),
  rightArrow: require('@/assets/icons/rightArrow.png'),
  selectedIcon: require('@/assets/icons/selectedIcon.png'),
  leftProvider: require('@/assets/icons/leftProvider.png'),
  plus: require('@/assets/icons/plus.png'),
  plusBlack: require('@/assets/icons/plusBlack.png'),
  pin: require('@/assets/icons/pin.png'),
  pinFill: require('@/assets/icons/pinFill.png'),
  camera: require('@/assets/icons/camera.png'),
}

export const logo: Assets = {
  allchiveLogo: require('@/assets/logo/allchiveLogo.png'),
}
