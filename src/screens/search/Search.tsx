import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native'
import { useMutation, useQuery } from 'react-query'

import { getSearchLatest, getSearch, getSearchRelation, deleteSearchLatest } from '@/apis/search'
import { defaultIcons } from '@/assets'
import { SearchBar } from '@/components/searchBar/SearchBar'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  AllRemoveText,
  Container,
  ItemText,
  LatestContainer,
  TabContainer,
  LatestSearch,
  SmallImage,
  RowView,
} from './Search.style'
import { SearchTab } from './SearchTab'

/**
 * Search
 */
const Search = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [searchText, setSearchText] = useState('')
  const [searchType, setSearchType] = useState<'ALL' | 'MY' | 'COMMUNITY'>('ALL')

  const { data: searchData } = useQuery(['getSearch'], () => getSearch(searchType, searchText))

  const { data: searchRelation } = useQuery(['getSearchRelation'], () =>
    getSearchRelation(searchText)
  )

  const { data: latestSearchData } = useQuery(['getSearchLatest'], () => getSearchLatest())

  const { mutate: deleteLatestMutate } = useMutation(deleteSearchLatest)

  /**
   * handleSearch
   */
  const handleSearch = () => {
    // searchMutate()
  }

  /**
   * 검색어를 선택했을 경우
   */
  const handleSelectItem = (item: string) => {
    setSearchText(item)
  }

  /**
   * 선택한 최근 검색어를 삭제하는 함수
   */
  const handleRemoveLatest = (item: number) => {
    deleteLatestMutate(item)
  }

  /**
   * 최근 검색어를 모두 삭제하는 함수
   */
  const handleRemoveAllLatest = () => {
    // TODO: 최근 검색어 전체 삭제
  }

  return (
    <Container>
      <RowView>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image source={defaultIcons.back} />
        </TouchableOpacity>
        <SearchBar
          placeholder={i18n.t('pleaseEnterSearchKeyword')}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
        />
      </RowView>

      {latestSearchData !== undefined && !searchText && (
        <>
          <LatestContainer>
            <LatestSearch>{i18n.t('recentlySearchText')}</LatestSearch>
            <TouchableOpacity onPress={handleRemoveAllLatest}>
              <AllRemoveText>{i18n.t('allRemove')}</AllRemoveText>
            </TouchableOpacity>
          </LatestContainer>
          {latestSearchData.keyword?.map((item) => (
            <LatestContainer key={item.latestSearchId}>
              <TouchableOpacity onPress={() => handleSelectItem(item.word)}>
                <ItemText>{item.word}</ItemText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveLatest(item.latestSearchId)}>
                <SmallImage source={defaultIcons.grayCloseButton} />
              </TouchableOpacity>
            </LatestContainer>
          ))}
        </>
      )}

      <TabContainer>
        {searchText && searchData !== undefined && <SearchTab searchData={searchData} />}
      </TabContainer>
    </Container>
  )
}

export default Search
