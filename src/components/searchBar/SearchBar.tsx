import React from 'react'

import SearchIcon from '@/assets/icons/search.svg'
import XMark from '@/assets/icons/x-mark.svg'
import useTextFocus from '@/hooks/useTextFocus'
import { colors } from '@/styles/colors'

import { Container, RemoveImageContainer, Style, SearchInput } from './SearchBar.style'

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
  const { inputRef } = useTextFocus()

  return (
    <Container>
      <SearchInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={colors.gray200}
        value={value}
        onChangeText={onChangeText}
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
