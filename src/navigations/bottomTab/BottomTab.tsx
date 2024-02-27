import React, { useEffect, useState } from 'react'

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import ArchivingFocusIcon from '@/assets/icons/archiving-focus.svg'
import ArchivingIcon from '@/assets/icons/archiving.svg'
import CommunityFocusIcon from '@/assets/icons/community-focus.svg'
import CommunityIcon from '@/assets/icons/community.svg'
import UploadIcon from '@/assets/icons/upload.svg'
import BottomSheet from '@/components/bottomSheet/BottomSheet'
import UploadModal from '@/components/modal/uploadModal/UploadModal'
import TabBarBackground from '@/components/tabBar/tabBarBackground/TabBarBackground'
import TabIcon from '@/components/tabBar/tabIcon/TabIcon'
import useGetShare from '@/hooks/useGetShare'
import { Community } from '@/screens/main/community/Community'
import { Home } from '@/screens/main/home/Home'
import { colors } from '@/styles/colors'

import { Styles, UploadButton, UploadButtonContainer } from './BottomTab.style'

type BottomTabParamList = {
  Home: undefined
  Community: undefined
}

export type BottomTabNavigationProps = BottomTabNavigationProp<BottomTabParamList>
export type BottomTabNavigationParams = NavigatorScreenParams<BottomTabParamList>

const BottomTabNavigator = createBottomTabNavigator<BottomTabParamList>()

/**
 * BottomTab
 */
export const BottomTab = () => {
  const [showUpload, setShowUpload] = useState(false)
  useGetShare()

  return (
    <>
      <BottomTabNavigator.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            display: `${showUpload ? 'none' : 'flex'}`,
            position: 'absolute',
            bottom: 40,
            height: 70,
            alignItems: 'center',
            elevation: 0,
            borderTopWidth: 0,
          },
          /**
           * tabBarBackground
           */
          tabBarBackground: () => <TabBarBackground />,
        }}
      >
        <BottomTabNavigator.Screen
          name="Home"
          component={Home}
          options={{
            /**
             *
             */
            tabBarIcon: ({ focused }) => (
              <TabIcon text="archiving">
                {focused ? <ArchivingFocusIcon /> : <ArchivingIcon height={22} />}
              </TabIcon>
            ),
          }}
        />
        <BottomTabNavigator.Screen
          name="Community"
          component={Community}
          options={{
            /**
             *
             */
            tabBarIcon: ({ focused }) => (
              <TabIcon text="community">
                {focused ? <CommunityFocusIcon /> : <CommunityIcon />}
              </TabIcon>
            ),
          }}
        />
      </BottomTabNavigator.Navigator>
      {/* 업로드 버튼 */}
      <UploadButtonContainer>
        <LinearGradient
          style={Styles.linearGradient}
          colors={[colors.yellow500, colors.mainYellow]}
        >
          <UploadButton onPress={() => setShowUpload(true)}>
            <UploadIcon />
          </UploadButton>
        </LinearGradient>
      </UploadButtonContainer>
      <BottomSheet
        isVisible={showUpload}
        onClose={() => setShowUpload(false)}
        onModalHide={() => null}
      >
        <UploadModal onClose={() => setShowUpload(false)} />
      </BottomSheet>
    </>
  )
}
