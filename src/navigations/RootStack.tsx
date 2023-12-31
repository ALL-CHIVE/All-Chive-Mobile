import React, { useEffect, useState } from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import { updateTokens } from '@/apis'
import { ContentType } from '@/models/enums/ContentType'
import { ReportType } from '@/models/enums/ReportType'
import { BottomTab, BottomTabNavigationParams } from '@/navigations/bottomTab/BottomTab'
import AddProfile from '@/screens/addProfile/AddProfile'
import { Agreement } from '@/screens/agreement/Agreement'
import { ArchivingManagement } from '@/screens/archivingManagement/ArchivingManagement'
import { BlockManagement } from '@/screens/blockManagement/BlockManagement'
import { Edit } from '@/screens/content/edit/Edit'
import { Upload } from '@/screens/content/upload/Upload'
import ContentDetail from '@/screens/contentDetail/ContentDetail'
import ContentList from '@/screens/contentList/ContentList'
import { CreateTag } from '@/screens/createTag/CreateTag'
import { Login } from '@/screens/login/Login'
import { MyAccount } from '@/screens/myAccount/MyAccount'
import { Mypage } from '@/screens/mypage/Mypage'
import { Notice } from '@/screens/notice/Notice'
import OnBoarding1 from '@/screens/onBoarding/OnBoarding1'
import OnBoarding2 from '@/screens/onBoarding/OnBoarding2'
import { RecycleBin } from '@/screens/recycleBin/RecycleBin'
import Report from '@/screens/report/Report'
import Search from '@/screens/search/Search'
import SelectCategory from '@/screens/selectCategory/SelectCategory'
import { TagManagement } from '@/screens/tagManagement/TagManagement'
import { checkIsInstalled } from '@/services/localStorage/LocalStorage'
import { colors } from '@/styles/colors'

export type RootStackParamList = {
  OnBoarding1: undefined
  OnBoarding2: undefined
  Agreement: undefined
  SelectCategory: { marketingAgreement: boolean }
  AddProfile: { categories: string[]; marketingAgreement: boolean }
  BottomTab: BottomTabNavigationParams
  Login: undefined
  ContentList: { id: number; title: string }
  Upload: { type: ContentType }
  CreateTag: undefined
  ContentDetail: {
    archivingId: number
    contentId: number
    isFromUpload: boolean
  }
  Report: { id: number; type: ReportType }
  Search: undefined
  Edit: { id: number; type: ContentType }
  Mypage: undefined
  MyAccount: undefined
  ArchivingManagement: undefined
  TagManagement: undefined
  BlockManagement: undefined
  Notice: undefined
  RecycleBin: undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>

const Stack = createNativeStackNavigator<RootStackParamList>()

/**
 * RootStack
 */
export const RootStack = () => {
  const [isSignIn, setIsSignIn] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide()
    }, 3000)

    checkIsInstalled().then((res) => {
      setIsInstalled(res)

      if (res) {
        updateTokens().then((res) => {
          setIsSignIn(res)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })

    return () => clearTimeout(timer)
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
          gestureEnabled: false,
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
          name="Agreement"
          component={Agreement}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="SelectCategory"
          component={SelectCategory}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="AddProfile"
          component={AddProfile}
          initialParams={{
            categories: [],
          }}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="ContentList"
          component={ContentList}
        />
        <Stack.Screen
          name="Upload"
          component={Upload}
          initialParams={{ type: ContentType.Image }}
        />
        <Stack.Screen
          name="CreateTag"
          component={CreateTag}
        />
        <Stack.Screen
          name="ContentDetail"
          component={ContentDetail}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
        />
        <Stack.Screen
          name="Report"
          component={Report}
        />
        <Stack.Screen
          name="Search"
          component={Search}
        />
        <Stack.Screen
          name="Mypage"
          component={Mypage}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
        />
        <Stack.Screen
          name="ArchivingManagement"
          component={ArchivingManagement}
        />
        <Stack.Screen
          name="TagManagement"
          component={TagManagement}
        />
        <Stack.Screen
          name="BlockManagement"
          component={BlockManagement}
        />
        <Stack.Screen
          name="Notice"
          component={Notice}
        />
        <Stack.Screen
          name="RecycleBin"
          component={RecycleBin}
        />
      </Stack.Navigator>
    </>
  )
}
