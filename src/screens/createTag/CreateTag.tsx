import React, { useState } from 'react'

import { AxiosError } from 'axios'
import { ScrollView } from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getTag, postTag } from '@/apis/tag'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { SimpleDialog } from '@/components/dialogs/simpleDialog/SimpleDialog'
import { Divider } from '@/components/divider/Divider'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SearchBar } from '@/components/searchBar/SearchBar'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import i18n from '@/locales'
import { GetTagResponse } from '@/models/Tag'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SelectTagState } from '@/state/upload/SelectTagState'

import { ClickableTag } from '../upload/components/ClickableTag'

import {
  Container,
  LatestTitle,
  PlusTagButton,
  PlusTagText,
  RowView,
  Title,
} from './CreateTag.style'
interface TagProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const CreateTag = ({ navigation }: TagProps) => {
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)
  const [searchText, setSearchText] = useState('')

  const [openDialog, setOpenDialog] = useState(false)

  const { mutate } = useMutation(() => postTag(searchText))

  const { data: latestTagData } = useQuery<GetTagResponse, AxiosError>(['tag'], () => getTag(true))

  const { data: tagData } = useQuery<GetTagResponse, AxiosError>(['tag'], () => getTag(false))

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
  const handleSelectTag = (searchText: string) => {
    if (selectTag.length >= 10) {
      setOpenDialog(true)
    }
    setSelectTag([...selectTag, searchText])
  }

  /**
   *
   */
  const handleUploadTag = () => {
    // TODO: upload tag & navigate to LinkUpload
    setSelectTag(selectTag)
    navigation.navigate('LinkUpload')
  }

  return (
    <Container>
      <CloseButtonHeader
        title={i18n.t('tag')}
        onClose={() => navigation.goBack()}
      />

      <RowView>
        <ScrollView horizontal={true}>
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
        </ScrollView>
      </RowView>

      <SearchBar
        placeholder={i18n.t('searchTag')}
        value={searchText}
        onChangeText={handleSearch}
      />

      {searchText.length > 0 && tagData?.tags.find((tag) => tag.name === searchText) ? (
        <RowView>
          <ClickableTag
            tag={searchText}
            onClick={() => {
              if (!selectTag.includes(searchText)) {
                handleSelectTag(searchText)
              }
            }}
          />
        </RowView>
      ) : null}

      {searchText.length > 0 && !tagData?.tags.find((tag) => tag.name === searchText) ? (
        <>
          <Title>{`${i18n.t('notExistTag')}\n ${i18n.t('askCreateTag')}`}</Title>
          <PlusTagButton onPress={handleCreateTag}>
            {/* TODO: + Icon 추가 */}
            <PlusTagText>{`+ ${i18n.t('createTag')}`}</PlusTagText>
          </PlusTagButton>
        </>
      ) : (
        <></>
      )}

      {latestTagData && (
        <>
          <Divider />
          <LatestTitle>{i18n.t('recentlyTag')}</LatestTitle>
          <ScrollView>
            <RowView>
              {latestTagData.tags.map((tag) => (
                <ClickableTag
                  key={tag.tagId}
                  tag={tag.name}
                  onClick={() => {
                    if (!selectTag.includes(searchText)) {
                      handleSelectTag(searchText)
                    }
                  }}
                />
              ))}
            </RowView>
          </ScrollView>
        </>
      )}

      <SimpleDialog
        isVisible={openDialog}
        title={i18n.t('noMoreTag')}
        completeText={i18n.t('confirm')}
        onClose={() => setOpenDialog(false)}
      />

      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handleUploadTag}
        isDisabled={selectTag.length === 0}
      />
    </Container>
  )
}
