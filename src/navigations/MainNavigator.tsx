import { CompositeNavigationProp } from '@react-navigation/native'

import { RootStackNavigationProp } from './RootStack'
import { BottomTabNavigationProps } from './bottomTab/BottomTab'

export type MainNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProps
>
