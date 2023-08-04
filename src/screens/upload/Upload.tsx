import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useMutation } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { postContents } from '@/apis/content'
import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SelectArchivingModal } from '@/components/modal/selectArchivingModal/SelectArchivingModal'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import i18n from '@/locales'
import { ImageUploadMenuType, ImageUploadMenus } from '@/models/enums/ActionSheetType'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { handleImageUploadMenu } from '@/services/ActionSheetService'
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
  PlusImageButton,
  RightButton,
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
  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const [memo, setMemo] = useState('')
  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [lastFocused, setLastFocused] = useState(-1)
  const [currentFocused, setCurrentFocused] = useState(-1)

  const selectArchiving = useRecoilValue(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)

  const actionSheetRef = useRef<ActionSheet>(null)

  const { mutate: postContentsMutate } = useMutation(
    () =>
      postContents({
        contentType: route.params.type,
        archivingId: selectArchiving.id,
        title: contentName,
        link: link,
        imgUrl: '',
        tagIds: [],
        memo: memo,
      }),
    {
      /**
       *
       */
      onSuccess: () => {
        navigation.navigate('BottomTab', { screen: 'Home' })
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
   *
   */
  const handlesubmit = () => {
    // mutate()
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
        onClose={() => navigation.navigate('BottomTab', { screen: 'Home' })}
      />
      <DefaultScrollContainer>
        <Container>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'position'}
            keyboardVerticalOffset={200}
            style={{ flex: 1 }}
          >
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
              <RightButton source={defaultIcons.rightArrow} />
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
                  onChangeText={setLink}
                  onFocus={() => handleFocused(2)}
                  style={
                    (currentFocused === 2 && Styles.focused) ||
                    (lastFocused >= 2 && contentName.length > 0 && Styles.clicked)
                  }
                />
                {/* TODO: Condition Icon 추가 */}
                <Condition>
                  <ConditionText style={contentName.length > 0 && Styles.conditionComplete}>
                    {i18n.t('checkUrl')}
                  </ConditionText>
                </Condition>
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
                    <Image source={defaultIcons.plus} />
                  </PlusImageButton>
                )}
              </>
            )}
            <TagTitleContainer>
              <TagTitle>{i18n.t('tag')}</TagTitle>
              <AddTagText>{i18n.t('choice10')}</AddTagText>
            </TagTitleContainer>
            <RowView>
              <ScrollView horizontal={true}>
                <AddTagButton onPress={() => navigation.navigate('CreateTag')}>
                  <AddTagText>{`+ ${i18n.t('addTag')}`}</AddTagText>
                </AddTagButton>
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
            <TagTitleContainer>
              <TagTitle>{i18n.t('memo')}</TagTitle>
              <AddTagText>{i18n.t('choice')}</AddTagText>
            </TagTitleContainer>
            <TextInput
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
          </KeyboardAvoidingView>
        </Container>
      </DefaultScrollContainer>
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handlesubmit}
        isDisabled={
          !archivingName ||
          !contentName ||
          (route.params.type === ContentType.Image && !image) ||
          (route.params.type === ContentType.Link && !link)
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
