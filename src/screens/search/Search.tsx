import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, TouchableOpacity } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { getSearchLatest, getSearch, getSearchRelation, deleteSearchLatest } from '@/apis/search'
import { defaultIcons } from '@/assets'
import LeftArrowIcon from '@/assets/icons/left_arrow.svg'
import XMark from '@/assets/icons/x_mark.svg'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import { Loading } from '@/components/loading/Loading'
import { SearchBar } from '@/components/searchBar/SearchBar'
import i18n from '@/locales'
import { SearchType } from '@/models/enums/SearchType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SearchTextState } from '@/state/SearchTextState'

import {
  AllRemoveText,
  Container,
  ItemText,
  LatestContainer,
  TabContainer,
  LatestSearch,
  SmallImage,
  Header,
  RelationContainer,
  BackButton,
} from './Search.style'
import { SearchTab } from './tabs/SearchTab'

/**
 * Search
 */
const Search = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [searchText, setSearchText] = useRecoilState(SearchTextState)
  const [isFocus, setIsFocus] = useState(false)

  const {
    data: searchData,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useQuery(['getSearch', searchText], () => getSearch(SearchType.All, searchText), {
    enabled: searchText !== '' && !isFocus,
  })

  const {
    data: searchRelation,
    isLoading: isRelationLoading,
    isError: isRelationError,
  } = useQuery(['getSearchRelation', searchText], () => getSearchRelation(searchText), {
    enabled: searchText !== '' && isFocus,
  })

  const {
    data: latestSearchData,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useQuery(['getSearchLatest'], () => getSearchLatest(), {
    enabled: searchText === '',
  })

  const { mutate: deleteLatestMutate } = useMutation(deleteSearchLatest)

  /**
   * handleSearch
   */
  const handleSearch = () => {
    if (searchText === '') return
    else {
      setIsFocus(false)
    }
  }

  /**
   * 검색어를 선택했을 경우
   */
  const handleSelectItem = (item: string) => {
    setSearchText(item)
    setIsFocus(false)
  }

  /**
   * 선택한 최근 검색어를 삭제하는 함수
   */
  const handleRemoveLatest = (item: number) => {
    deleteLatestMutate([item])
  }

  /**
   * 최근 검색어를 모두 삭제하는 함수
   */
  const handleRemoveAllLatest = () => {
    if (latestSearchData === undefined) return
    else {
      const item = latestSearchData.keywords.map((item) => item.latestSearchId)
      deleteLatestMutate(item)
    }
  }

  return (
    <>
      {isSearchLoading || isRelationLoading || isLatestLoading ? <Loading /> : <></>}
      <ErrorDialog
        isVisible={isSearchError}
        onClick={() => {
          queryClient.invalidateQueries(['getSearch', searchText])
        }}
      />
      <ErrorDialog
        isVisible={isRelationError}
        onClick={() => {
          queryClient.invalidateQueries(['getSearchRelation', searchText])
        }}
      />
      <ErrorDialog
        isVisible={isLatestError}
        onClick={() => {
          queryClient.invalidateQueries(['getSearchLatest'])
        }}
      />

      <Container>
        <Header>
          <BackButton
            onPress={() => {
              navigation.goBack()
            }}
          >
            <LeftArrowIcon />
          </BackButton>
          <SearchBar
            placeholder={i18n.t('pleaseEnterSearchKeyword')}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            onFocus={() => setIsFocus(true)}
          />
        </Header>

        {latestSearchData?.keywords && latestSearchData.keywords.length > 0 && !searchText && (
          <>
            <LatestContainer>
              <LatestSearch>{i18n.t('recentlySearchText')}</LatestSearch>
              <TouchableOpacity onPress={handleRemoveAllLatest}>
                <AllRemoveText>{i18n.t('allRemove')}</AllRemoveText>
              </TouchableOpacity>
            </LatestContainer>
            {latestSearchData.keywords.map((item) => (
              <LatestContainer key={item.latestSearchId}>
                <TouchableOpacity onPress={() => handleSelectItem(item.word)}>
                  <ItemText>{item.word}</ItemText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveLatest(item.latestSearchId)}>
                  <XMark
                    width={16}
                    height={14}
                  />
                </TouchableOpacity>
              </LatestContainer>
            ))}
          </>
        )}

        {searchRelation && searchText && isFocus && (
          <>
            {searchRelation.map((item) => (
              <RelationContainer key={item}>
                <Image
                  source={defaultIcons.search}
                  style={{ marginRight: 12, marginTop: 5 }}
                />
                <TouchableOpacity onPress={() => handleSelectItem(item)}>
                  <ItemText>{item}</ItemText>
                </TouchableOpacity>
              </RelationContainer>
            ))}
          </>
        )}
        <TabContainer>
          {searchText && searchData && !isFocus && <SearchTab data={searchData} />}
        </TabContainer>
      </Container>
    </>
  )
}

export default Search
