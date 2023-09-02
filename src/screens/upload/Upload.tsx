import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import isUrl from 'is-url'
import { throttle } from 'lodash'
import { ImageSourcePropType, ImageURISource, ScrollView, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { postContents } from '@/apis/content/Content'
import PlusIcon from '@/assets/icons/plus.svg'
import RightArrowIcon from '@/assets/icons/right-arrow.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import Indicator from '@/components/indicator/Indicator'
import { SelectArchivingModal } from '@/components/modal/selectArchivingModal/SelectArchivingModal'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import Verifier from '@/components/verifier/Verifier'
import i18n from '@/locales'
import { ImageUploadMenuType, ImageUploadMenus } from '@/models/enums/ActionSheetType'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { handleImageUploadMenu } from '@/services/ActionSheetService'
import { uploadContentImage } from '@/services/ImageService'
import { getLinkImage } from '@/services/LinkService'
import { getActionSheetTintColor } from '@/services/StyleService'
import { CategoryState } from '@/state/CategoryState'
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
} from './Upload.style'

interface UploadProps {
  route: RouteProp<RootStackParamList, 'Upload'>
}

/**
 *
 */
export const Upload = ({ route }: UploadProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const [memo, setMemo] = useState('')
  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [lastFocused, setLastFocused] = useState(-1)
  const [currentFocused, setCurrentFocused] = useState(-1)
  const [isValidUrl, setIsValidUrl] = useState(false)

  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)
  const currentCategory = useRecoilValue(CategoryState)

  const actionSheetRef = useRef<ActionSheet>(null)

  /**
   *
   */
  const createContents = async () => {
    let contentImageUrl = ''

    switch (route.params.type) {
      case ContentType.Link: {
        contentImageUrl = await getLinkImage(link)
        break
      }
      case ContentType.Image: {
        const imageUrl = (image as ImageURISource)?.uri ?? ''

        if (imageUrl) {
          contentImageUrl = await uploadContentImage(imageUrl)
        }
        break
      }
    }

    return await postContents(
      route.params.type,
      selectArchiving.id,
      contentName,
      link,
      contentImageUrl,
      selectTag.map((tag) => tag.tagId),
      memo
    )
  }

  const { mutate: createContentsMutate, isLoading: isUploading } = useMutation(createContents, {
    /**
     * createContentsMutate 성공 시 recoil state를 초기화하고,
     * 홈 화면을 리패치한 후 홈 화면으로 이동합니다.
     */
    onSuccess: (data) => {
      setSelectArchiving({ id: -1, title: '' })
      setSelectTag([])
      queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
      navigation.navigate('ContentDetail', {
        archivingId: selectArchiving.id,
        contentId: data.contentId,
        isFromUpload: true,
      })
    },
  })

  const throttledCreateContentsMutate = throttle(createContentsMutate, 5000)

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
   * 업로드를 종료합니다.
   */
  const handleClose = () => {
    setSelectArchiving({ id: -1, title: '' })
    setSelectTag([])
    navigation.navigate('BottomTab', { screen: 'Home' })
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
        title={i18n.t('upload')}
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
              placeholderTextColor={colors.gray200}
              value={contentName}
              onChangeText={setContentName}
              onFocus={() => handleFocused(1)}
              maxLength={15}
              style={
                (currentFocused === 1 && Styles.focused) ||
                (lastFocused >= 1 && contentName.length > 0 && Styles.clicked)
              }
            />
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
                  placeholderTextColor={colors.gray200}
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
              placeholderTextColor={colors.gray200}
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
      {isUploading && <Indicator />}
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={() => throttledCreateContentsMutate()}
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
        tintColor={getActionSheetTintColor()}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </DefaultContainer>
  )
}
