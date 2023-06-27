import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from 'react-query'

import { RootStack } from '@/screens/RootStack'

const queryClient = new QueryClient()

/**
 * App
 */
function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <RootStack />
      </QueryClientProvider>
    </NavigationContainer>
  )
}

export default App
