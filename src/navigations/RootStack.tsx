import React, { useEffect, useState } from 'react'

import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native'
import { useRecoilState } from 'recoil'

import { getHasAutoSignInSession } from '@/apis/fakeServerApis'
import { ReportType } from '@/models/enums/ReportType'
import { SignInType } from '@/models/enums/SignInType'
import { BottomTab, BottomTabNavigationParams } from '@/navigations/bottomTab/BottomTab'
import AddProfile from '@/screens/addProfile/AddProfile'
import { ArchivingManagement } from '@/screens/archivingManagement/ArchivingManagement'
import { BlockManagement } from '@/screens/blockManagement/BlockManagement'
import { CommunityUsePolicy } from '@/screens/communityUsePolicy/CommunityUsePolicy'
import ContentDetail from '@/screens/contentDetail/ContentDetail'
import ContentList from '@/screens/contentList/ContentList'
import { CreateTag } from '@/screens/createTag/CreateTag'
import { ImageEdit } from '@/screens/edit/imageEdit/ImageEdit'
import { LinkEdit } from '@/screens/edit/linkEdit/LinkEdit'
import { Login } from '@/screens/login/Login'
import { MyAccount } from '@/screens/myAccount/MyAccount'
import { Mypage } from '@/screens/mypage/Mypage'
import OnBoarding1 from '@/screens/onBoarding/OnBoarding1'
import OnBoarding2 from '@/screens/onBoarding/OnBoarding2'
import { RecycleBin } from '@/screens/recycleBin/RecycleBin'
import Report from '@/screens/report/Report'
import Search from '@/screens/search/Search'
import SelectCategory from '@/screens/selectCategory/SelectCategory'
import { TagManagement } from '@/screens/tagManagement/TagManagement'
import { TermsOfService } from '@/screens/termsOfService/TermsOfService'
import { ImageUpload } from '@/screens/upload/imageUpload/ImageUpload'
import { LinkUpload } from '@/screens/upload/linkUpload/LinkUpload'
import { checkIsInstalled } from '@/services/localStorage/LocalStorage'
import { SignInState } from '@/state/signIn/SignInState'
import { colors } from '@/styles/colors'

export type RootStackParamList = {
  OnBoarding1: undefined
  OnBoarding2: undefined
  SelectCategory: { type: SignInType }
  AddProfile: { type: SignInType; categories: string[] }
  BottomTab: BottomTabNavigationParams
  Login: undefined
  ContentList: { id: number; title: string }
  LinkUpload: undefined
  ImageUpload: undefined
  CreateTag: undefined
  ContentDetail: { id: number }
  Report: { id: number; type: ReportType }
  Search: undefined
  LinkEdit: undefined
  ImageEdit: undefined
  Mypage: undefined
  MyAccount: undefined
  ArchivingManagement: undefined
  TagManagement: undefined
  BlockManagement: undefined
  TermsOfService: undefined
  CommunityUsePolicy: undefined
  RecycleBin: undefined
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
          //TODO: 로그인 처리
          setIsSignIn(res)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
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
          name="SelectCategory"
          component={SelectCategory}
          initialParams={{ type: SignInType.Kakao }}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="AddProfile"
          component={AddProfile}
          initialParams={{
            type: SignInType.Kakao,
            categories: ['FOOD'],
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
          name="CreateTag"
          component={CreateTag}
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
        <Stack.Screen
          name="Search"
          component={Search}
        />
        <Stack.Screen
          name="LinkEdit"
          component={LinkEdit}
        />
        <Stack.Screen
          name="ImageEdit"
          component={ImageEdit}
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
          name="TermsOfService"
          component={TermsOfService}
        />
        <Stack.Screen
          name="CommunityUsePolicy"
          component={CommunityUsePolicy}
        />
        <Stack.Screen
          name="RecycleBin"
          component={RecycleBin}
        />
      </Stack.Navigator>
    </>
  )
}
