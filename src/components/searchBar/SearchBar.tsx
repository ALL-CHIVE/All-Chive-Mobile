import React from 'react'

import { defaultIcons } from '@/assets'

import {
  Container,
  RemoveImage,
  RemoveImageContainer,
  SearchImage,
  TextInput,
} from './SearchBar.style'

interface SearchBarProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
}
/**
 *
 */
export const SearchBar = ({ placeholder, value, onChangeText }: SearchBarProps) => {
  return (
    <Container>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
      <SearchImage source={defaultIcons.search} />
      {value.length > 0 ? (
        <>
          <RemoveImageContainer onPress={() => onChangeText('')}>
            <RemoveImage source={defaultIcons.closeButton} />
          </RemoveImageContainer>
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}
