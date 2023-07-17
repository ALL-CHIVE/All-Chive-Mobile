import React, { useState } from 'react'

import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getTag } from '@/apis/tag/getTag'
import { postTag } from '@/apis/tag/postTag'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { Divider } from '@/components/divider/Divider'
import { CloseButtonHeader } from '@/components/header/closeButtonHeader/CloseButtonHeader'
import { SearchBar } from '@/components/searchBar/SearchBar'
import { Tag } from '@/components/tag/Tag'
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
        title="태그"
        onClose={() => navigation.goBack()}
      />
      {selectTag &&
        selectTag.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            isGray={true}
            onRemove={() => {
              setSelectTag(selectTag.filter((item) => item !== tag))
            }}
          />
        ))}
      <SearchBar
        placeholder="태그를 검색해보세요"
        value={searchText}
        onChangeText={handleSearch}
      />
      <Title>{`검색한 태그가 없습니다.\n 새로운 태그로 등록할까요?`}</Title>
      <PlusTagButton onPress={handleCreateTag}>
        {/* TODO: + Icon 추가 */}
        <PlusTagText>+ 태그 등록하기</PlusTagText>
      </PlusTagButton>
      {latestTagData && (
        <>
          <Divider />
          <Title>최근 사용한 태그</Title>
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
        textKey="완료"
        onPress={handleUploadTag}
        isDisabled={selectTag.length === 0}
      />
    </Container>
  )
}
