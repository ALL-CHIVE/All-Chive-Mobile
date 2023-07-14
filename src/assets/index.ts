import { ImageSourcePropType } from 'react-native'

export interface Assets {
  [key: string]: ImageSourcePropType
}

export const defaultImages: Assets = {
  profile: require('@/assets/default/profile.png'),
  onBoarding1: require('@/assets/default/onboarding1.png'),
  onBoarding2: require('@/assets/default/onboarding2.png'),
  uploadBottomSheet: require('@/assets/default/uploadBottomSheet.png'),
}

export const defaultIcons: Assets = {
  archiving: require('@/assets/icons/archiving.png'),
  archivingFocus: require('@/assets/icons/archiving_focus.png'),
  community: require('@/assets/icons/community.png'),
  // communityFocus: require('@/assets/icons/community_focus.png'),
  upload: require('@/assets/icons/upload.png'),
  design: require('@/assets/icons/design.png'),
  food: require('@/assets/icons/food.png'),
  homeAndLiving: require('@/assets/icons/homeAndLiving.png'),
  life: require('@/assets/icons/life.png'),
  selfDevelopment: require('@/assets/icons/selfDevelopment.png'),
  shopping: require('@/assets/icons/shopping.png'),
  sports: require('@/assets/icons/sports.png'),
  tech: require('@/assets/icons/tech.png'),
  trends: require('@/assets/icons/trends.png'),
  xButton: require('@/assets/icons/xButton.png'),
}

export const loginIcons: Assets = {
  apple: require('@/assets/login/apple.png'),
  kakao: require('@/assets/login/kakao.png'),
}
