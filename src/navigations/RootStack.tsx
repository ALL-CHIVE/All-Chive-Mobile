import React, { useEffect, useState } from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'
import { useRecoilState } from 'recoil'

import { getHasAutoSignInSession } from '@/apis/fakeServerApis'
import { ReportType } from '@/models/enums/ReportType'
import { BottomTab, BottomTabNavigationParams } from '@/navigations/bottomTab/BottomTab'
import AddProfile from '@/screens/addProfile/AddProfile'
import ContentDetail from '@/screens/contentDetail/ContentDetail'
import ContentList from '@/screens/contentList/ContentList'
import { Login } from '@/screens/login/Login'
import OnBoarding1 from '@/screens/onBoarding/OnBoarding1'
import OnBoarding2 from '@/screens/onBoarding/OnBoarding2'
import Report from '@/screens/report/Report'
import SelectCategory from '@/screens/selectCategory/SelectCategory'
import { Tag } from '@/screens/tag/Tag'
import { ImageUpload } from '@/screens/upload/imageUpload/ImageUpload'
import { LinkUpload } from '@/screens/upload/linkUpload/LinkUpload'
import { requestPermissions } from '@/services/PermissionService'
import { checkIsInstalled } from '@/services/localStorage/LocalStorage'
import { SignInState } from '@/state/SignInState'
import { colors } from '@/styles/colors'

export type RootStackParamList = {
  OnBoarding1: undefined
  OnBoarding2: undefined
  SelectCategory: undefined
  AddProfile: undefined
  BottomTab: BottomTabNavigationParams
  Login: undefined
  ContentList: { id: number; title: string }
  LinkUpload: undefined
  ImageUpload: undefined
  Tag: undefined
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
  const [isInstalled, setIsInstalled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkIsInstalled().then((res) => {
      setIsInstalled(res)

      if (res) {
        // TODO: 자동 로그인 API 연동
        getHasAutoSignInSession().then((res) => {
          setIsSignIn(res)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }

      requestPermissions()
    })
  }, [])

  if (isLoading) {
    return <SafeAreaView></SafeAreaView>
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white },
        }}
        initialRouteName={isSignIn ? 'BottomTab' : isInstalled ? 'Login' : 'OnBoarding1'}
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
          name="ContentList"
          component={ContentList}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="LinkUpload"
          component={LinkUpload}
        />
        <Stack.Screen
          name="ImageUpload"
          component={ImageUpload}
        />
        <Stack.Screen
          name="Tag"
          component={Tag}
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
