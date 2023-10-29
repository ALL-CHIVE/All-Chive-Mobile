import { ImageSourcePropType } from 'react-native'

import { defaultImages } from '@/assets'

interface Page {
  title: string
  image: ImageSourcePropType
  buttonText: string
}

export const Pages = [
  {
    title: 'easilyManageContent',
    image: defaultImages.onBoarding1,
    buttonText: 'next',
  },
  {
    title: 'shareCategoryWithPeople',
    image: defaultImages.onBoarding2,
    buttonText: 'complete',
  },
] as Page[]
