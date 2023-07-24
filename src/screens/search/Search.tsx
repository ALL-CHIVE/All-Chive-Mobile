import React, { useState } from 'react'

import { View } from 'react-native'
import { useMutation } from 'react-query'

import { postSearch } from '@/apis/search/search'
import { SearchBar } from '@/components/searchBar/SearchBar'
import i18n from '@/locales'

/**
 * Search
 */
const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [searchType, setSearchType] = useState<'ALL' | 'MY' | 'COMMUNITY'>('ALL')

  const { mutate: searchMutate } = useMutation(() => postSearch(searchType, searchText))

  /**
   * handleSearch
   */
  const handleSearch = () => {
    searchMutate()
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
