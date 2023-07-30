import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import i18n from '@/locales'
import { SearchTabData } from '@/models/SearchTab'

import { AllTab } from './AllTab'
import { ArchivingTab } from './ArchivingTab'
import { CommunityTab } from './CommunityTab'
import { SearchTabBar } from './SearchTabBar'

/**
 * 검색 창 내부 탭
 */
export const SearchTab = ({ searchData }: SearchTabData) => {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator
      initialRouteName="AllTab"
      tabBar={(props) => <SearchTabBar {...props} />}
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
            searchData={searchData}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ArchivingTab"
        options={{
          tabBarLabel: `${i18n.t('myArchiving')}`,
        }}
      >
        {(props) => (
          <ArchivingTab
            {...props}
            searchData={searchData}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="CommunityTab"
        options={{
          tabBarLabel: `${i18n.t('community')}`,
        }}
      >
        {(props) => (
          <CommunityTab
            {...props}
            searchData={searchData}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
