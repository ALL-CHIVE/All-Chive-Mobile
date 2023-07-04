import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu'
import { QueryClient, QueryClientProvider } from 'react-query'

import { RootStack } from '@/navigations/RootStack'

const queryClient = new QueryClient()

/**
 * App
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MenuProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </MenuProvider>
    </QueryClientProvider>
  )
}

export default App
