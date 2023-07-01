import React, { useState } from 'react'

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import { Archiving } from '@/screens/archiving/Archiving'
import { Community } from '@/screens/community/Community'

import { BottomTabImage, Container, UploadButton, UploadModal } from './BottomTab.style'

type BottomTabParamList = {
  Archiving: undefined
  Community: undefined
}

export type BottomTabNavigationProps = BottomTabNavigationProp<BottomTabParamList>

const BottomTabNavigator = createBottomTabNavigator<BottomTabParamList>()

/**
 * BottomTab
 */
export const BottomTab = () => {
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
            left: 24,
            right: 24,
            elevation: 0,
            borderRadius: 36.5,
            height: 70,
          },
        }}
      >
        <BottomTabNavigator.Screen
          name="Archiving"
          component={Archiving}
          options={{
            /**
             *
             */
            tabBarIcon: ({ focused }) => (
              <Container>
                <BottomTabImage
                  source={require('@/assets/icon_archiving_focus.png')}
                  resizeMode="contain"
                />
                <Text>아카이빙</Text>
              </Container>
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
              <Container>
                <BottomTabImage
                  source={require('@/assets/icon_community.png')}
                  resizeMode="contain"
                />
                <Text>커뮤니티</Text>
              </Container>
            ),
          }}
        />
      </BottomTabNavigator.Navigator>
      <Container>
        <UploadButton onPress={handleUpload}>
          <Image
            source={require('@/assets/icon_upload.png')}
            resizeMode="contain"
          />
        </UploadButton>
      </Container>
      {showUpload ? (
        <Modal
          isVisible={showUpload}
          onBackdropPress={handleUpload}
          backdropOpacity={0.5}
        >
          <UploadModal source={require('@/assets/upload.png')}>
            <TouchableOpacity>
              <Text>사진</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>링크</Text>
            </TouchableOpacity>
          </UploadModal>
        </Modal>
      ) : null}
    </>
  )
}
