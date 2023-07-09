import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { RootStack } from '@/navigations/RootStack'

import { Login } from './screens/login/Login'

const queryClient = new QueryClient()

/**
 * App
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <MenuProvider>
          <NavigationContainer>
            {/* <RootStack /> */}
            <Login />
          </NavigationContainer>
        </MenuProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
