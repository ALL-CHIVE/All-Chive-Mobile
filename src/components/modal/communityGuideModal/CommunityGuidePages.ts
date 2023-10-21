import { ImageSourcePropType } from 'react-native'

import { defaultImages } from '@/assets'

interface Page {
  title: string
  image: ImageSourcePropType
  width: number
  height: number
  buttonText: string
}

export const Pages = [
  {
    title: 'saveYourFavoriteArchives',
    image: defaultImages.communityGuide,
    width: 330,
    height: 330,
    buttonText: 'next',
  },
  {
    title: 'reportBadArchives',
    image: defaultImages.reportComplete,
    width: 149,
    height: 149,
    buttonText: 'start',
  },
] as Page[]
