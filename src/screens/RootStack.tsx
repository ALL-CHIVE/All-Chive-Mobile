import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { BottomTab } from '@/components/bottomTab/BottomTab'

const Stack = createNativeStackNavigator()

/**
 *
 */
export const RootStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
        />
      </Stack.Navigator>
    </>
  )
}
