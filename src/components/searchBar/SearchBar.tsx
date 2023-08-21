import React from 'react'

import { debounce } from 'lodash'

import SearchIcon from '@/assets/icons/search.svg'
import XMark from '@/assets/icons/x_mark.svg'
import { colors } from '@/styles/colors'

import { Container, RemoveImageContainer, Style, TextInput } from './SearchBar.style'

interface SearchBarProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onSubmitEditing?: () => void
  onFocus?: () => void
  maxLength?: number
}

/**
 *
 */
export const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onFocus,
  maxLength,
}: SearchBarProps) => {
  const onChange = debounce((event) => {
    onChangeText(event)
  }, 300)

  return (
    <Container>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        onChangeText={(e) => onChange(e)}
        onSubmitEditing={onSubmitEditing}
        onFocus={onFocus}
        maxLength={maxLength}
      />
      <SearchIcon style={Style.searchIcon} />
      {value.length > 0 ? (
        <>
          <RemoveImageContainer onPress={() => onChangeText('')}>
            <XMark
              width={16}
              height={14}
              color={colors.gray600}
            />
          </RemoveImageContainer>
        </>
      ) : (
        <></>
      )}
    </Container>
  )
}
