import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import {
  getSearchLatest,
  getSearch,
  getSearchRelation,
  deleteSearchLatest,
} from '@/apis/search/Search'
import LeftArrowIcon from '@/assets/icons/left-arrow.svg'
import SearchIcon from '@/assets/icons/search.svg'
import XMark from '@/assets/icons/x-mark.svg'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import { Loading } from '@/components/loading/Loading'
import { SearchBar } from '@/components/searchBar/SearchBar'
import i18n from '@/locales'
import { SearchType } from '@/models/enums/SearchType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SearchTextState } from '@/state/SearchTextState'
import { colors } from '@/styles/colors'

import {
  AllRemoveText,
  Container,
  ItemText,
  LatestContainer,
  TabContainer,
  LatestSearch,
  Header,
  RelationContainer,
  BackButton,
  Styles,
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
  const [debounceText, setDebounceText] = useState('')
  const [showLoading, setShowLoading] = useState(false)

  const [isSearchErrorVisible, setIsSearchErrorVisible] = useState(false)
  const [isRelationErrorVisible, setIsRelationErrorVisible] = useState(false)
  const [isLatestErrorVisible, setIsLatestErrorVisible] = useState(false)

  const { data: searchData, isLoading: isSearchLoading } = useQuery(
    ['getSearch', searchText],
    () => getSearch(SearchType.All, searchText),
    {
      enabled: searchText !== '' && !isFocus,
      /**
       *
       */
      onError: () => {
        setIsSearchErrorVisible(true)
      },
    }
  )

  const { data: searchRelation, isLoading: isRelationLoading } = useQuery(
    ['getSearchRelation', debounceText],
    () => getSearchRelation(searchText),
    {
      enabled: debounceText !== '' && isFocus,
      /**
       *
       */
      onError: () => {
        setIsRelationErrorVisible(true)
      },
    }
  )

  const { data: latestSearchData, isLoading: isLatestLoading } = useQuery(
    ['getSearchLatest'],
    () => getSearchLatest(),
    {
      enabled: !searchText,
      /**
       *
       */
      onError: () => {
        setIsLatestErrorVisible(true)
      },
    }
  )

  const { mutate: deleteLatestMutate } = useMutation(deleteSearchLatest, {
    /**
     * 삭제 성공 시 getSearchLatest 쿼리를 리패치합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getSearchLatest'])
    },
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceText(searchText)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [searchText, 500])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSearchLoading || isRelationLoading || isLatestLoading) {
        setShowLoading(true)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [isSearchLoading || isRelationLoading || isLatestLoading])

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
      {showLoading && (isSearchLoading || isRelationLoading || isLatestLoading) ? (
        <Loading />
      ) : (
        <></>
      )}
      <InformationErrorDialog
        isVisible={isSearchErrorVisible}
        onRetry={() => {
          setIsSearchErrorVisible(false)
          queryClient.invalidateQueries(['getSearch', searchText])
        }}
        onClick={() => {
          setIsSearchErrorVisible(false)
        }}
      />
      <InformationErrorDialog
        isVisible={isRelationErrorVisible}
        onRetry={() => {
          setIsRelationErrorVisible(false)
          queryClient.invalidateQueries(['getSearchRelation', searchText])
        }}
        onClick={() => {
          setIsRelationErrorVisible(false)
        }}
      />
      <InformationErrorDialog
        isVisible={isLatestErrorVisible}
        onRetry={() => {
          setIsLatestErrorVisible(false)
          queryClient.invalidateQueries(['getSearchLatest'])
        }}
        onClick={() => {
          setIsLatestErrorVisible(false)
        }}
      />

      <Container>
        <Header>
          <BackButton
            onPress={() => {
              setSearchText('')
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
                    color={colors.gray600}
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
                <SearchIcon style={Styles.searchIcon} />
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
