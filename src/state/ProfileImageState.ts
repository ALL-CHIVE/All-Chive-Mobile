import { ImageSourcePropType } from 'react-native'
import { atom } from 'recoil'

export const ProfileImageState = atom<ImageSourcePropType | null>({
  key: 'profileImageState',
  default: null,
})
