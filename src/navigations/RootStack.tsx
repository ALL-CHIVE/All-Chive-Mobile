import React from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { BottomTab, BottomTabNavigationProps } from '@/navigations/bottomTab/BottomTab'
import ContentDetail from '@/screens/contentDetail/ContentDetail'

export type RootStackParamList = {
  BottomTab: BottomTabNavigationProps
  ContentDetail: { id: number }
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * RootStack
 */
export const RootStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
        />
        <Stack.Screen
          name="ContentDetail"
          component={ContentDetail}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  )
}
