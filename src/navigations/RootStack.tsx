import React from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { BottomTab } from '@/navigations/bottomTab/BottomTab'
import AddProfile from '@/screens/addProfile/AddProfile'
import ContentDetail from '@/screens/contentDetail/ContentDetail'
import OnBoarding1 from '@/screens/onBoarding/OnBoarding1'
import OnBoarding2 from '@/screens/onBoarding/OnBoarding2'
import SelectSubject from '@/screens/selectSubject/SelectSubject'
import { colors } from '@/styles/colors'

export type RootStackParamList = {
  OnBoarding1: undefined
  OnBoarding2: undefined
  SelectSubject: undefined
  AddProfile: undefined
  BottomTab: undefined
  ContentDetail: { id: number }
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()

interface RootStackProps {
  isInstalled: boolean
}

/**
 * RootStack
 */
export const RootStack = ({ isInstalled }: RootStackProps) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
      >
        {!isInstalled && (
          <>
            <Stack.Screen
              name="OnBoarding1"
              component={OnBoarding1}
            />
            <Stack.Screen
              name="OnBoarding2"
              component={OnBoarding2}
            />
            <Stack.Screen
              name="SelectSubject"
              component={SelectSubject}
            />
            <Stack.Screen
              name="AddProfile"
              component={AddProfile}
            />
          </>
        )}
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
