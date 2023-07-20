import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'

import { defaultIcons } from '@/assets'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import { Button, Container, Icon } from './SearchButton.style'

/**
 * SearchButton
 */
const SearchButton = () => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Shadow
      startColor={colors.gray50}
      offset={[0, 0]}
      distance={4}
      style={{ borderRadius: 19.5, width: '100%' }}
    >
      <Container>
        <Button onPress={() => navigation.navigate('Search')}>
          <Icon source={defaultIcons.searchNormal} />
        </Button>
      </Container>
    </Shadow>
  )
}

export default SearchButton
