import React, { useState } from 'react'

import { ScrollView } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { getTag, postTag } from '@/apis/tag'
import PlusIcon from '@/assets/icons/plus.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { SimpleDialog } from '@/components/dialogs/simpleDialog/SimpleDialog'
import { Divider } from '@/components/divider/Divider'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SearchBar } from '@/components/searchBar/SearchBar'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import Verifier from '@/components/verifier/Verifier'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { checkTag } from '@/services/StringChecker'
import { SelectTagState } from '@/state/upload/SelectTagState'
import { colors } from '@/styles/colors'

import { ClickableTag } from '../upload/components/ClickableTag'

import {
  Container,
  CreateTagContainer,
  LatestTitle,
  PlusTagButton,
  PlusTagText,
  RowView,
  Styles,
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
  const [isTagValid, setIsTagValid] = useState(false)

  const { mutate: postTagMutate } = useMutation(() => postTag(searchText), {
    /**
     * postTagMutate 성공 시 getTagData를 리패치합니다.
     */
    onSuccess: (data) => {
      handleSelectTag({
        tagId: data.tagId,
        name: data.name,
      })
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
    setIsTagValid(checkTag(text))
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
            maxLength={20}
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
            <CreateTagContainer>
              <Title>{`${i18n.t('notExistTag')}\n ${i18n.t('askCreateTag')}`}</Title>
              <Verifier
                isValid={isTagValid}
                text={'tagVerify'}
              />
              <PlusTagButton
                onPress={handleCreateTag}
                disabled={!isTagValid}
                style={!isTagValid && Styles.disableButton}
              >
                <PlusIcon
                  color={colors.gray500}
                  width={14}
                  height={14}
                />
                <PlusTagText>{`${i18n.t('createTag')}`}</PlusTagText>
              </PlusTagButton>
            </CreateTagContainer>
          ) : (
            <></>
          )}

          {latestTagData && latestTagData.length > 0 && (
            <>
              <Divider />
              <LatestTitle>{i18n.t('recentlyTag')}</LatestTitle>
              <ScrollView
                bounces={false}
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
