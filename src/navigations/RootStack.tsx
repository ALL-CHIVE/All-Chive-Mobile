import React, { useEffect } from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { useRecoilState } from 'recoil'

import { getHasAutoSignInSession } from '@/apis/fakeServerApis'
import { ReportType } from '@/models/enums/ReportType'
import { BottomTab } from '@/navigations/bottomTab/BottomTab'
import AddProfile from '@/screens/addProfile/AddProfile'
import ContentDetail from '@/screens/contentDetail/ContentDetail'
import { Login } from '@/screens/login/Login'
import OnBoarding1 from '@/screens/onBoarding/OnBoarding1'
import OnBoarding2 from '@/screens/onBoarding/OnBoarding2'
import Report from '@/screens/report/Report'
import SelectCategory from '@/screens/selectCategory/SelectCategory'
import { requestPermissions } from '@/services/PermissionService'
import { SignInState } from '@/state/SignInState'
import { colors } from '@/styles/colors'

export type RootStackParamList = {
  OnBoarding1: undefined
  OnBoarding2: undefined
  SelectCategory: undefined
  AddProfile: undefined
  BottomTab: undefined
  Login: undefined
  ContentDetail: { id: number }
  Report: { id: number; type: ReportType }
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * RootStack
 */
export const RootStack = () => {
  const [isSignIn, setIsSignIn] = useRecoilState(SignInState)

  useEffect(() => {
    getHasAutoSignInSession().then((res) => {
      setIsSignIn(res)
      // TODO: 스플래시 없애기
      requestPermissions()
    })
  }, [])

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
        initialRouteName={isSignIn ? 'BottomTab' : 'OnBoarding1'}
      >
        <Stack.Screen
          name="OnBoarding1"
          component={OnBoarding1}
        />
        <Stack.Screen
          name="OnBoarding2"
          component={OnBoarding2}
        />
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
          name="ContentDetail"
          component={ContentDetail}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </>
  )
}
