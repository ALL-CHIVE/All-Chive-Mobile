import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'

import SearchIcon from '@/assets/icons/search.svg'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import { Button, Container } from './SearchButton.style'

/**
 * SearchButton
 */
const SearchButton = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Shadow
      startColor={colors.searchShadow}
      offset={[0, 3]}
      distance={8}
      style={{ borderRadius: 17, width: '100%' }}
    >
      <Container>
        <Button onPress={() => navigation.navigate('Search')}>
          <SearchIcon />
        </Button>
      </Container>
    </Shadow>
  )
}

export default SearchButton
