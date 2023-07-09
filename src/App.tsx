import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { MenuProvider } from 'react-native-popup-menu'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import { RootStack } from '@/navigations/RootStack'
import { checkIsInstalled, setIsInstalled } from '@/services/localStorage/LocalStorage'

import { requestPermissions } from './services/PermissionService'

const queryClient = new QueryClient()

/**
 * App
 */
function App() {
  const [isInstalled, setInstalled] = useState<boolean>(false)

  useEffect(() => {
    checkIsInstalled().then((res) => {
      setInstalled(res)
      // TODO: 스플래시 없애기
      requestPermissions()
    })
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <MenuProvider>
          <NavigationContainer>
            <RootStack isInstalled={isInstalled} />
          </NavigationContainer>
        </MenuProvider>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
