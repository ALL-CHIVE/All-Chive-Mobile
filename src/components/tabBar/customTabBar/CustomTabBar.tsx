import React from 'react'

import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'

import { Container, TabBarWrapper, TabButton, TabText } from './CustomTabBar.style'

interface Route {
  key: string
  name: string
  params?: object | undefined
}

/**
 * 커스텀 탭바
 */
export const CustomTabBar = ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
  return (
    <Container>
      <TabBarWrapper>
        {state.routes.map((route: Route, index: number) => {
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel
          const isFocused = state.index === index
          /**
           *
           */
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }
          return (
            <TabButton
              isFocused={isFocused}
              onPress={onPress}
              key={index}
            >
              <TabText isFocused={isFocused}>{label?.toString()}</TabText>
            </TabButton>
          )
        })}
      </TabBarWrapper>
    </Container>
  )
}
