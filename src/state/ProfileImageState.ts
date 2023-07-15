import { ImageSourcePropType } from 'react-native'
import { atom } from 'recoil'

import { defaultImages } from '@/assets'

export const ProfileImageState = atom<ImageSourcePropType | null>({
  key: 'profileImageState',
  default: defaultImages.profile,
})
