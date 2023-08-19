import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import isUrl from 'is-url'
import { ImageSourcePropType, ImageURISource, ScrollView, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState } from 'recoil'

import { getContentsInfo, patchContents } from '@/apis/content'
import PlusIcon from '@/assets/icons/plus.svg'
import RightArrowIcon from '@/assets/icons/right_arrow.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SelectArchivingModal } from '@/components/modal/selectArchivingModal/SelectArchivingModal'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import Verifier from '@/components/verifier/Verifier'
import i18n from '@/locales'
import { GetContentsInfoResponse } from '@/models/Contents'
import { ImageUploadMenuType, ImageUploadMenus } from '@/models/enums/ActionSheetType'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { queryKeys } from '@/queries/queryKeys'
import { handleImageUploadMenu } from '@/services/ActionSheetService'
import { uploadContentImage } from '@/services/ImageService'
import { getLinkImage } from '@/services/LinkService'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'
import { SelectTagState } from '@/state/upload/SelectTagState'
import { colors } from '@/styles/colors'

import {
  AddTagButton,
  AddTagText,
  ArchivingSelect,
  Condition,
  ConditionText,
  Container,
  ContentImage,
  MemoTextInput,
  PlusImageButton,
  RowView,
  SelectArchivingText,
  Styles,
  TagTitle,
  TagTitleContainer,
  TextInput,
  Title,
} from './Edit.style'

interface EditProps {
  route: RouteProp<RootStackParamList, 'Edit'>
}

/**
 * 컨텐츠 수정 페이지
 */
export const Edit = ({ route }: EditProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState<ImageSourcePropType>()
  const [memo, setMemo] = useState('')
  const [openArchivingModal, setOpenArchivingModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const [lastFocused, setLastFocused] = useState(-1)
  const [currentFocused, setCurrentFocused] = useState(-1)
  const [isValidUrl, setIsValidUrl] = useState(false)

  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)

  const actionSheetRef = useRef<ActionSheet>(null)

  const { data: content } = useQuery<GetContentsInfoResponse>(
    [`contentsInfo${route.params.id}`, route.params.id],
    () => getContentsInfo(route.params.id),
    {
      /**
       *
       */
      onSuccess: (content) => {
        setArchivingName(content.archivingTitle)
        setContentName(content.contentTitle)
        setLink(content.link)
        setIsValidUrl(isUrl(content.link))
        setMemo(content.contentMemo)
        setImageUrl(content.imgUrl)
        setSelectArchiving({ id: content.archivingId, title: content.archivingTitle })
        content.imgUrl &&
          setImage({
            uri:
              content.contentType === ContentType.Image
                ? `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${content.imgUrl}`
                : content.imgUrl,
          })

        setSelectTag(
          content.tagList.map((tag) => {
            return { tagId: tag.tagId, name: tag.name }
          })
        )
      },
    }
  )

  const { mutate: patchContentsMutate } = useMutation(
    () =>
      patchContents({
        contentId: route.params.id,
        contentType: route.params.type,
        archivingId: selectArchiving.id,
        title: contentName,
        link: link,
        imgUrl: imageUrl,
        tagIds: selectTag.map((tag) => tag.tagId),
        memo: memo,
      }),
    {
      /**
       * patchContentsMutate 성공 시 recoil state를 초기화하고,
       * C
       */
      onSuccess: () => {
        setSelectArchiving({ id: -1, title: '' })
        setSelectTag([])
        queryClient.invalidateQueries([queryKeys.contents, route.params.id])
        queryClient.invalidateQueries([`contentByArchiving`, selectArchiving.id])
        navigation.goBack()
      },
      /**
       *
       */
      onError: () => {
        // TODO: 에러 처리
      },
    }
  )

  /**
   * 아카이빙 추가 모달 종료 액션입니다.
   */
  const handleCloseModal = () => {
    setOpenArchivingModal(false)
    setArchivingName(selectArchiving.title)
  }

  /**
   * 업로드 이미지 액션싯을 보여줍니다.
   */
  const handleUploadImage = () => {
    actionSheetRef.current?.show()
  }

  /**
   * 포커스를 제어합니다.
   */
  const handleFocused = (index: number) => {
    setCurrentFocused(index)
    if (lastFocused < index) {
      setLastFocused(index)
    }
  }

  /**
   * 편집을 종료합니다.
   */
  const handleClose = () => {
    setSelectArchiving({ id: -1, title: '' })
    setSelectTag([])
    navigation.goBack()
  }

  /**
   * 완료 액션
   */
  const handleSubmit = async () => {
    switch (route.params.type) {
      case ContentType.Link: {
        const url = await getLinkImage(link)
        setImageUrl(url)
        break
      }
      case ContentType.Image: {
        const imageUrl = (image as ImageURISource)?.uri ?? ''
        const contentImageUrl = await uploadContentImage(imageUrl)
        contentImageUrl && setImageUrl(contentImageUrl)
        break
      }
    }

    patchContentsMutate()
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = async (index: ImageUploadMenuType) => {
    const selectedImage = await handleImageUploadMenu(index)

    if (selectedImage) {
      setImage({ uri: selectedImage })
    }
  }

  /**
   * handleChangeLink
   */
  const handleChangeLink = (link: string) => {
    setLink(link)
    setIsValidUrl(!!link && isUrl(link))
  }

  return (
    <DefaultContainer>
      <CloseButtonHeader
        title={i18n.t('update')}
        onClose={handleClose}
      />
      <DefaultScrollContainer>
        <KeyboardAwareScrollView extraHeight={200}>
          <Container>
            <Title style={{ marginTop: 0 }}>{i18n.t('archivingName')}</Title>
            <ArchivingSelect
              style={
                (currentFocused === 0 && Styles.focused) ||
                (lastFocused >= 0 && !!archivingName && Styles.clicked)
              }
              onPress={() => {
                setOpenArchivingModal(true)
                handleFocused(0)
              }}
            >
              <SelectArchivingText
                style={lastFocused >= 0 && !!archivingName && Styles.clickedText}
              >
                {archivingName ? archivingName : i18n.t('choiceArchiving')}
              </SelectArchivingText>
              <RightArrowIcon
                color={lastFocused >= 0 && !!archivingName ? colors.gray600 : colors.gray200}
                style={Styles.rightArrow}
              />
            </ArchivingSelect>
            <Title>{i18n.t('contentName')}</Title>
            <TextInput
              placeholder={i18n.t('contentVerify')}
              value={contentName}
              onChangeText={setContentName}
              onFocus={() => handleFocused(1)}
              maxLength={15}
              style={
                (currentFocused === 1 && Styles.focused) ||
                (lastFocused >= 1 && contentName.length > 0 && Styles.clicked)
              }
            />
            {/* TODO: Condition Icon 추가 */}
            <Condition>
              {/* TODO: Condition Icon 추가 */}
              <ConditionText style={contentName.length > 0 && Styles.conditionComplete}>
                {i18n.t('contentVerify')}
              </ConditionText>
            </Condition>
            {route.params.type === ContentType.Link && (
              <>
                {/* Link */}
                <Title>{i18n.t('link')}</Title>
                <TextInput
                  placeholder={i18n.t('placeHolderLink')}
                  value={link}
                  onChangeText={handleChangeLink}
                  onFocus={() => handleFocused(2)}
                  style={
                    (currentFocused === 2 && Styles.focused) ||
                    (lastFocused >= 2 && contentName.length > 0 && Styles.clicked)
                  }
                />
                <Verifier
                  isValid={isValidUrl}
                  text="checkUrl"
                />
              </>
            )}
            {route.params.type === ContentType.Image && (
              <>
                {/* Image */}
                <Title>{i18n.t('image')}</Title>
                {image ? (
                  <TouchableOpacity onPress={handleUploadImage}>
                    <ContentImage source={image} />
                  </TouchableOpacity>
                ) : (
                  <PlusImageButton onPress={handleUploadImage}>
                    <PlusIcon color={colors.gray300} />
                  </PlusImageButton>
                )}
              </>
            )}
            <TagTitleContainer>
              <TagTitle>{i18n.t('tag')}</TagTitle>
              <AddTagText>{i18n.t('choice10')}</AddTagText>
            </TagTitleContainer>
            <RowView>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <AddTagButton onPress={() => navigation.navigate('CreateTag')}>
                  <AddTagText>{`+ ${i18n.t('addTag')}`}</AddTagText>
                </AddTagButton>
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
            <TagTitleContainer>
              <TagTitle>{i18n.t('memo')}</TagTitle>
              <AddTagText>{i18n.t('choice')}</AddTagText>
            </TagTitleContainer>
            <MemoTextInput
              placeholder={i18n.t('placeHolderMemo')}
              value={memo}
              onChangeText={setMemo}
              onFocus={() => handleFocused(3)}
              maxLength={150}
              multiline
              style={
                (currentFocused === 3 && Styles.focused) ||
                (lastFocused >= 3 && memo.length > 0 && Styles.clicked)
              }
            />
          </Container>
        </KeyboardAwareScrollView>
      </DefaultScrollContainer>
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handleSubmit}
        isDisabled={
          !archivingName ||
          !contentName ||
          (route.params.type === ContentType.Image && !image) ||
          (route.params.type === ContentType.Link && (!link || !isValidUrl))
        }
      />
      <SelectArchivingModal
        onClose={handleCloseModal}
        isVisible={openArchivingModal}
      />
      <ActionSheet
        ref={actionSheetRef}
        title={i18n.t('uploadImage')}
        options={ImageUploadMenus()}
        cancelButtonIndex={0}
        tintColor={colors.gray600}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </DefaultContainer>
  )
}
