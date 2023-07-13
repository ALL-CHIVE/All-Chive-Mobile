import React, { useState } from 'react'

import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

import { defaultIcons, defaultImages } from '@/assets'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { Community } from '@/screens/community/Community'
import { Home } from '@/screens/home/Home'

import { BottomTabImage, Container, UploadButton, UploadModal } from './BottomTab.style'

type BottomTabParamList = {
  Home: undefined
  Community: undefined
}

interface BottomTabProps {
  navigation: MainNavigationProp
}

export type BottomTabNavigationProps = BottomTabNavigationProp<BottomTabParamList>

const BottomTabNavigator = createBottomTabNavigator<BottomTabParamList>()

/**
 * BottomTab
 */
export const BottomTab = ({ navigation }: BottomTabProps) => {
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
          name="Home"
          component={Home}
          options={{
            /**
             *
             */
            tabBarIcon: ({ focused }) => (
              <Container>
                <BottomTabImage
                  source={defaultIcons.archivingFocus}
                  resizeMode="contain"
                />
                <Text>{i18n.t('archiving')}</Text>
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
                  source={defaultIcons.community}
                  resizeMode="contain"
                />
                <Text>{i18n.t('community')}</Text>
              </Container>
            ),
          }}
        />
      </BottomTabNavigator.Navigator>
      <Container>
        <UploadButton onPress={handleUpload}>
          <Image
            source={defaultIcons.upload}
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
          <UploadModal source={defaultImages.uploadBottomSheet}>
            <TouchableOpacity>
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
