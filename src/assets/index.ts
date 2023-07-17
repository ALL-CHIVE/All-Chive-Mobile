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
}

export const defaultIcons: Assets = {
  archiving: require('@/assets/icons/archiving.png'),
  archivingFocus: require('@/assets/icons/archiving_focus.png'),
  community: require('@/assets/icons/community.png'),
  // communityFocus: require('@/assets/icons/community_focus.png'),
  upload: require('@/assets/icons/upload.png'),
  design: require('@/assets/icons/design.png'),
  food: require('@/assets/icons/food.png'),
  homeLiving: require('@/assets/icons/homeLiving.png'),
  life: require('@/assets/icons/life.png'),
  selfImprovement: require('@/assets/icons/selfImprovement.png'),
  shopping: require('@/assets/icons/shopping.png'),
  sport: require('@/assets/icons/sport.png'),
  tech: require('@/assets/icons/tech.png'),
  trend: require('@/assets/icons/trend.png'),
  closeButton: require('@/assets/icons/closeButton.png'),
  back: require('@/assets/icons/back.png'),
  search: require('@/assets/icons/search.png'),
}

export const loginIcons: Assets = {
  apple: require('@/assets/login/apple.png'),
  kakao: require('@/assets/login/kakao.png'),
}
