import React, { useState } from 'react'

import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getTag } from '@/apis/tag/getTag'
import { postTag } from '@/apis/tag/postTag'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { Divider } from '@/components/divider/Divider'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SearchBar } from '@/components/searchBar/SearchBar'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import i18n from '@/locales'
import { GetTagResponse } from '@/models/tag/Tag'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SelectTagState } from '@/state/upload/SelectTagState'

import { ClickableTag } from '../upload/components/ClickableTag'

import { Container, PlusTagButton, PlusTagText, Title } from './CreateTag.style'
interface TagProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const CreateTag = ({ navigation }: TagProps) => {
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)
  const [searchText, setSearchText] = useState('')

  const { mutate } = useMutation(() =>
    postTag({
      name: searchText,
    })
  )

  const { data: latestTagData } = useQuery<GetTagResponse, AxiosError>(['tag'], () =>
    getTag({ latest: true })
  )

  const { data: TagData } = useQuery<GetTagResponse, AxiosError>(['tag'], () =>
    getTag({ latest: false })
  )

  /**
   *
   */
  const handleSearch = (text: string) => {
    setSearchText(text)
    // TODO: 검색어 처리 로직 추가
  }

  /**
   *
   */
  const handleCreateTag = () => {
    // TODO: create tag (mutate)
  }

  /**
   *
   */
  const handleUploadTag = () => {
    // TODO: upload tag & navigate to LinkUpload
  }

  return (
    <Container>
      <CloseButtonHeader
        title={i18n.t('tag')}
        onClose={() => navigation.goBack()}
      />
      {selectTag &&
        selectTag.map((tag) => (
          <GrayTag
            key={tag}
            tag={tag}
            onRemove={() => {
              setSelectTag(selectTag.filter((item) => item !== tag))
            }}
          />
        ))}
      <SearchBar
        placeholder={i18n.t('searchTag')}
        value={searchText}
        onChangeText={handleSearch}
      />
      <Title>{`${i18n.t('notExistTag')}\n ${i18n.t('askCreateTag')}`}</Title>
      <PlusTagButton onPress={handleCreateTag}>
        {/* TODO: + Icon 추가 */}
        <PlusTagText>{`+ ${i18n.t('createTag')}`}</PlusTagText>
      </PlusTagButton>
      {latestTagData && (
        <>
          <Divider />
          <Title>{i18n.t('recentlyTag')}</Title>
          {latestTagData.tags.map((tag) => (
            <ClickableTag
              key={tag.tagId}
              tag={tag.name}
              onClick={() => {
                if (!selectTag.includes(tag.name)) {
                  setSelectTag([...selectTag, tag.name])
                }
              }}
            />
          ))}
        </>
      )}

      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handleUploadTag}
        isDisabled={selectTag.length === 0}
      />
    </Container>
  )
}
