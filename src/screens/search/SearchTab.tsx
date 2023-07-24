import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

/**
 * 검색 창 내부 탭
 */
export const SearchTab = () => {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator initialRouteName="AllTab">
      <Tab.Screen
        name="AllTab"
        component={AllTab}
        options={{
          tabBarLabel: `전체`,
        }}
      />
      <Tab.Screen
        name="ArchivingTab"
        component={ArchivingTab}
        options={{
          tabBarLabel: `내 아카이빙`,
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityTab}
        options={{
          tabBarLabel: `커뮤니티`,
        }}
      />
    </Tab.Navigator>
  )
}

/**
 * 전체 탭
 */
export const AllTab = () => {
  return <></>
}

/**
 * 내 아카이빙만 보여주는 탭
 */
export const ArchivingTab = () => {
  return <></>
}

/**
 * 커뮤니티 모두 보여주는 탭
 */
export const CommunityTab = () => {
  return <></>
}
