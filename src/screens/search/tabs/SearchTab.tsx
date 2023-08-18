import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { CustomTabBar } from '@/components/tabBar/customTabBar/CustomTabBar'
import i18n from '@/locales'
import { SearchResponse } from '@/models/Search'

import { AllTab } from './AllTab'
import { ArchivingTab } from './ArchivingTab'
import { CommunityTab } from './CommunityTab'

/**
 * 검색 창 내부 탭
 */
export const SearchTab = ({ data }: SearchResponse) => {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName="AllTab"
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="AllTab"
        options={{
          tabBarLabel: `${i18n.t('ALL')} ${
            data.archivings.totalElements + data.community.totalElements
          }`,
        }}
      >
        {(props) => (
          <AllTab
            {...props}
            data={data}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ArchivingTab"
        options={{
          tabBarLabel: `${i18n.t('myArchiving')} ${data.archivings.totalElements}`,
        }}
      >
        {(props) => (
          <ArchivingTab
            {...props}
            data={data}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="CommunityTab"
        options={{
          tabBarLabel: `${i18n.t('community')} ${data.community.totalElements}`,
        }}
      >
        {(props) => (
          <CommunityTab
            {...props}
            data={data}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
