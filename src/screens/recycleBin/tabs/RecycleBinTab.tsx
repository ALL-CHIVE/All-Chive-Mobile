import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { CustomTabBar } from '@/components/tabBar/customTabBar/CustomTabBar'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'

import { AllTab } from './AllTab'
import { ArchivingTab } from './ArchivingTab'
import { ContentsTab } from './ContentsTab'

/**
 * 휴지통 내부 탭
 */
export const RecycleBinTab = ({ contents, archivings }: RecyclesResponse) => {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName="AllTab"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="AllTab"
        options={{
          tabBarLabel: `${i18n.t('ALL')}`,
        }}
      >
        {(props) => (
          <AllTab
            {...props}
            contents={contents}
            archivings={archivings}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ArchivingTab"
        options={{
          tabBarLabel: `${i18n.t('archiving')}`,
        }}
      >
        {(props) => (
          <ArchivingTab
            contents={[]}
            {...props}
            archivings={archivings}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ContentsTab"
        options={{
          tabBarLabel: `${i18n.t('contents')}`,
        }}
      >
        {(props) => (
          <ContentsTab
            contents={contents}
            archivings={[]}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}