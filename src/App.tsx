import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { Platform, StatusBar } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { RootStack } from '@/navigations/RootStack'

const queryClient = new QueryClient()

/**
 * App
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle={`${Platform.OS === 'android' ? 'light-content' : 'dark-content'}`} />
      <RecoilRoot>
        <MenuProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </MenuProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
