import React, { useState } from 'react'

import { View } from 'react-native'

import { SearchBar } from '@/components/searchBar/SearchBar'
import i18n from '@/locales'

/**
 * Search
 */
const Search = () => {
  const [searchText, setSearchText] = useState('')

  /**
   * handleSearch
   */
  const handleSearch = () => {
    console.log(searchText)
    // TODO: 검색어 처리 로직 추가
  }

  return (
    <View>
      <SearchBar
        placeholder={i18n.t('pleaseEnterSearchKeyword')}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
      />
    </View>
  )
}

export default Search
