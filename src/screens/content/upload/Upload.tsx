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
import InputBox from '@/components/inputBox/InputBox'
import { SelectArchivingModal } from '@/components/modal/selectArchivingModal/SelectArchivingModal'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import TextInput from '@/components/textInput/TextInput'
import Verifier from '@/components/verifier/Verifier'
import useFocus from '@/hooks/useFocus'
import useText from '@/hooks/useText'
import i18n from '@/locales'
import { ImageUploadMenuType, ImageUploadMenus } from '@/models/enums/ActionSheetType'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { handleImageUploadMenu } from '@/services/ActionSheetService'
import { uploadContentImage } from '@/services/ImageService'
import { getLinkImage } from '@/services/LinkService'
import { checkTitle } from '@/services/StringChecker'
import { getActionSheetTintColor } from '@/services/StyleService'
import { CategoryState } from '@/state/CategoryState'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'
import { SelectTagState } from '@/state/upload/SelectTagState'
import { colors } from '@/styles/colors'

import {
  AddTagButton,
  AddTagText,
  ArchivingSelect,
  Container,
  ContentImage,
  PlusImageButton,
  RowView,
  SelectArchivingText,
  TagTitle,
  TagTitleContainer,
  Title,
} from '../Content.style'

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
  const {
    text: title,
    isValid: isTitleValid,
    updateText: updateTitle,
    clearText: clearTitle,
  } = useText(checkTitle)

  const {
    text: link,
    isValid: isLinkValid,
    updateText: updateLink,
    clearText: clearLink,
  } = useText((link) => !!link && isUrl(link))

  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const [memo, setMemo] = useState('')
  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)
  const currentCategory = useRecoilValue(CategoryState)
  const { color: archivingColor, onFocus: onArchivingFocus, onBlur: onArchivingBlur } = useFocus()

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
      title,
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
   * 아카이빙 추가 모달을 엽니다.
   */
  const handleOpenModal = () => {
    setOpenArchivingModal(true)
    onArchivingFocus()
  }

  /**
   * 아카이빙 추가 모달 종료 액션입니다.
   */
  const handleCloseModal = () => {
    setOpenArchivingModal(false)
    setArchivingName(selectArchiving.title)
    onArchivingBlur(selectArchiving.title)
  }

  /**
   * 업로드 이미지 액션싯을 보여줍니다.
   */
  const handleUploadImage = () => {
    actionSheetRef.current?.show()
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
              onPress={handleOpenModal}
              style={{ borderColor: archivingColor }}
            >
              <SelectArchivingText
                style={{
                  color: archivingColor === colors.yellow500 ? colors.gray200 : archivingColor,
                }}
              >
                {archivingName ? archivingName : i18n.t('choiceArchiving')}
              </SelectArchivingText>
              <RightArrowIcon
                color={archivingColor === colors.yellow500 ? colors.gray200 : archivingColor}
              />
            </ArchivingSelect>
            <Title>{i18n.t('contentName')}</Title>
            <TextInput
              value={title}
              placeholder={i18n.t('titleVerify')}
              maxLength={15}
              onChangeText={updateTitle}
              handleClear={clearTitle}
              hasBorder
            />
            <Verifier
              isValid={isTitleValid}
              text={'titleVerify'}
            />
            {route.params.type === ContentType.Link && (
              <>
                {/* Link */}
                <Title>{i18n.t('link')}</Title>
                <TextInput
                  value={link}
                  placeholder={i18n.t('placeHolderLink')}
                  maxLength={undefined}
                  onChangeText={updateLink}
                  handleClear={clearLink}
                  hasBorder
                />
                <Verifier
                  isValid={isLinkValid}
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
            <InputBox
              placeholder={i18n.t('placeHolderMemo')}
              maxLength={150}
              text={memo}
              setText={setMemo}
              minHeight={123}
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
          !title ||
          (route.params.type === ContentType.Image && !image) ||
          (route.params.type === ContentType.Link && (!link || !isLinkValid))
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
