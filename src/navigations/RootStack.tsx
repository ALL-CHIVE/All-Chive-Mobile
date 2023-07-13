import React from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

import { BottomTab } from '@/navigations/bottomTab/BottomTab'
import AddProfile from '@/screens/addProfile/AddProfile'
import ContentDetail from '@/screens/contentDetail/ContentDetail'
import { LinkUpload } from '@/screens/linkUpload/LinkUpload'
import { Login } from '@/screens/login/Login'
import OnBoarding1 from '@/screens/onBoarding/OnBoarding1'
import OnBoarding2 from '@/screens/onBoarding/OnBoarding2'
import SelectCategory from '@/screens/selectCategory/SelectCategory'
import { colors } from '@/styles/colors'

export type RootStackParamList = {
  OnBoarding1: undefined
  OnBoarding2: undefined
  Login: undefined
  SelectCategory: undefined
  AddProfile: undefined
  BottomTab: undefined
  LinkUpload: undefined
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
          </>
        )}
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="SelectCategory"
          component={SelectCategory}
        />
        <Stack.Screen
          name="AddProfile"
          component={AddProfile}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
        />
        <Stack.Screen
          name="LinkUpload"
          component={LinkUpload}
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
