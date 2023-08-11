import React, { useState } from 'react'

import { Image, ScrollView } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { getTag, postTag } from '@/apis/tag'
import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { SimpleDialog } from '@/components/dialogs/simpleDialog/SimpleDialog'
import { Divider } from '@/components/divider/Divider'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SearchBar } from '@/components/searchBar/SearchBar'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import i18n from '@/locales'
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
 * 태그 화면
 */
export const CreateTag = ({ navigation }: TagProps) => {
  const queryClient = useQueryClient()

  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)

  const [searchText, setSearchText] = useState('')
  const [openDialog, setOpenDialog] = useState(false)

  const { mutate: postTagMutate } = useMutation(() => postTag(searchText), {
    /**
     * postTagMutate 성공 시 getTagData를 리패치합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getTagData', searchText])
    },
  })

  const { data: latestTagData } = useQuery(['getLatestTagData'], () => getTag(true))
  const { data: tagData } = useQuery(['getTagData', searchText], () => getTag(false))

  /**
   * handleSearch
   */
  const handleSearch = (text: string) => {
    setSearchText(text)
    // TODO: 검색어 처리 로직 추가
  }

  /**
   *
   */
  const handleCreateTag = () => {
    postTagMutate()
  }

  /**
   *
   */
  const handleSelectTag = (value: { tagId: number; name: string }) => {
    if (selectTag.length >= 10) {
      setOpenDialog(true)
    }
    setSelectTag([
      ...selectTag,
      {
        name: searchText,
        tagId: value.tagId,
      },
    ])
  }

  /**
   *
   */
  const handleUploadTag = () => {
    setSelectTag(selectTag)
    navigation.goBack()
  }

  return (
    <DefaultContainer>
      <CloseButtonHeader
        title={i18n.t('tag')}
        onClose={() => navigation.goBack()}
      />
      <DefaultScrollContainer>
        <Container>
          <RowView>
            <ScrollView
              horizontal={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {selectTag &&
                selectTag.map((tag) => (
                  <GrayTag
                    key={tag.tagId}
                    tag={tag.name}
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
          {searchText.length > 0 && tagData && tagData?.find((tag) => tag.name === searchText) ? (
            <RowView>
              <ClickableTag
                tag={searchText}
                onClick={() => {
                  if (!selectTag.find((tag) => tag.name === searchText)) {
                    handleSelectTag({
                      tagId: tagData.find((tag) => tag.name === searchText)?.tagId || 0,
                      name: searchText,
                    })
                  }
                }}
              />
            </RowView>
          ) : null}
          {searchText.length > 0 && tagData && !tagData?.find((tag) => tag.name === searchText) ? (
            <>
              <Title>{`${i18n.t('notExistTag')}\n ${i18n.t('askCreateTag')}`}</Title>
              <PlusTagButton onPress={handleCreateTag}>
                <Image source={defaultIcons.plusBlack} />
                <PlusTagText>{`${i18n.t('createTag')}`}</PlusTagText>
              </PlusTagButton>
            </>
          ) : (
            <></>
          )}

          {latestTagData && latestTagData.length > 0 && (
            <>
              <Divider />
              <LatestTitle>{i18n.t('recentlyTag')}</LatestTitle>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <RowView>
                  {latestTagData.map((tag) => (
                    <ClickableTag
                      key={tag.tagId}
                      tag={tag.name}
                      onClick={() => {
                        if (!selectTag.find((tag) => tag.name === searchText)) {
                          handleSelectTag({
                            tagId: tag.tagId,
                            name: tag.name,
                          })
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
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handleUploadTag}
        isDisabled={selectTag.length === 0}
      />
    </DefaultContainer>
  )
}
