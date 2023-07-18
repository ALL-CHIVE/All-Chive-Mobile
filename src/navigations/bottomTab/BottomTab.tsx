import React, { useState } from 'react'

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native'
import { Image, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal'

import { defaultIcons, defaultImages } from '@/assets'
import TabBarBackground from '@/components/tabBar/tabBarBackground/TabBarBackground'
import TabIcon from '@/components/tabBar/tabIcon/TabIcon'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { Community } from '@/screens/community/Community'
import { Home } from '@/screens/home/Home'
import { colors } from '@/styles/colors'

import { Container, Styles, UploadButton, UploadModal } from './BottomTab.style'

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
  const navigation = useNavigation<MainNavigationProp>()

  const [showUpload, setShowUpload] = useState(false)
  /**
   *
   */
  const handleUpload = () => {
    setShowUpload(!showUpload)
  }
  return (
    <>
      <BottomTabNavigator.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
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
              <TabIcon
                icon={defaultIcons.archivingFocus}
                text="archiving"
              />
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
              <TabIcon
                icon={defaultIcons.community}
                text="community"
              />
            ),
          }}
        />
      </BottomTabNavigator.Navigator>
      <Container>
        <LinearGradient
          style={Styles.linearGradient}
          colors={[colors.yellow500, colors.mainYellow]}
        >
          <UploadButton onPress={handleUpload}>
            <Image
              source={defaultIcons.upload}
              resizeMode="contain"
            />
          </UploadButton>
        </LinearGradient>
      </Container>
      {showUpload ? (
        <Modal
          isVisible={showUpload}
          onBackdropPress={handleUpload}
          backdropOpacity={0.5}
        >
          <UploadModal source={defaultImages.uploadBottomSheet}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ImageUpload')
              }}
            >
              <Text>{i18n.t('photo')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LinkUpload')
              }}
            >
              <Text>{i18n.t('link')}</Text>
            </TouchableOpacity>
          </UploadModal>
        </Modal>
      ) : null}
    </>
  )
}
