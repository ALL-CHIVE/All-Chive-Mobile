import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import {
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useMutation } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { CloseButtonHeader } from '@/components/header/closeButtonHeader/CloseButtonHeader'
import { ArchivingModal } from '@/components/modal/archivingModal/ArchivingModal'
import { Tag } from '@/components/tag/Tag'
import i18n from '@/locales'
import { ImageUploadMenuType } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { createCancleConfirmAlert } from '@/services/Alert'
import { checkPermission } from '@/services/PermissionService'
import { handleCameraOpen, handleFileOpen, handleImageSelect } from '@/services/imagePicker'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'
import { SelectTagState } from '@/state/upload/SelectTagState'
import { colors } from '@/styles/colors'

import {
  AddTagButton,
  AddTagText,
  ArchivingSelect,
  Condition,
  Container,
  Image,
  PlusImageButton,
  RowView,
  Styles,
  TextInput,
  Title,
} from '../Upload.style'
import { postContents } from '../apis/postContents'

interface ImageUploadProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const ImageUpload = ({ navigation }: ImageUploadProps) => {
  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const [memo, setMemo] = useState('')

  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [contentFocus, setContentFocus] = useState(false)
  const [memoFocus, setMemoFocus] = useState(false)

  const selectArchiving = useRecoilValue(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)

  const actionSheetRef = useRef<ActionSheet>(null)

  const { mutate } = useMutation(() =>
    postContents({
      contentType: 'image',
      archivingId: 0,
      title: contentName,
      imgUrl: '',
      tagIds: [],
      memo: memo,
    })
  )

  /**
   *
   */
  const handleCloseModal = () => {
    setOpenArchivingModal(false)
    setArchivingName(selectArchiving)
  }

  /**
   *
   */
  const handleContentFocus = () => {
    setContentFocus(true)
  }

  /**
   *
   */
  const handleContentBlur = () => {
    setContentFocus(false)
  }

  /**
   *
   */
  const handleUploadImage = () => {
    actionSheetRef.current?.show()
  }

  /**
   *
   */
  const handleActionSheetMenu = async (index: ImageUploadMenuType) => {
    switch (index) {
      case ImageUploadMenuType.selectFromPhotoLibrary: {
        const permission = await checkPermission(Permissions.PhotoLibrary)

        if (permission === 'blocked' || permission === 'denied') {
          createCancleConfirmAlert(
            'pleaseAllowPhotoPermission',
            Platform.select({
              ios: 'photoPermissionGuideIOS',
              android: 'photoPermissionGuideAndroid',
              default: '',
            }),
            () => Linking.openSettings()
          )

          return
        }

        const selectImage = await handleImageSelect()
        selectImage && setImage({ uri: selectImage.path })
        break
      }
      case ImageUploadMenuType.selectFromFile: {
        const permission = await checkPermission(Permissions.File)

        if (permission === 'blocked' || permission === 'denied') {
          createCancleConfirmAlert(
            'pleaseAllowFilePermission',
            Platform.select({
              ios: 'filePermissionGuideIOS',
              android: 'filePermissionGuideAndroid',
              default: '',
            }),
            () => Linking.openSettings()
          )

          return
        }

        const selectImage = await handleFileOpen()
        selectImage && setImage({ uri: selectImage.toString() })
        break
      }
      case ImageUploadMenuType.selectFromCamera: {
        const permission = await checkPermission(Permissions.Camera)

        if (permission === 'blocked' || permission === 'denied') {
          createCancleConfirmAlert(
            'pleaseAllowCameraPermission',
            Platform.select({
              ios: 'cameraPermissionGuideIOS',
              android: 'cameraPermissionGuideAndroid',
              default: '',
            }),
            () => Linking.openSettings()
          )

          return
        }

        const selectImage = await handleCameraOpen()
        selectImage && setImage({ uri: selectImage.path })
        break
      }
    }
  }

  /**
   *
   */
  const handleMemoFocus = () => {
    setMemoFocus(true)
  }

  /**
   *
   */
  const handleMemoBlur = () => {
    setMemoFocus(false)
  }

  /**
   *
   */
  const handlesubmit = () => {
    // mutate()
  }

  return (
    <Container>
      <CloseButtonHeader
        title={i18n.t('upload')}
        onClose={() => navigation.navigate('BottomTab', { screen: 'Home' })}
      />
      <Title>{i18n.t('archivingName')}</Title>
      <ArchivingSelect onPress={() => setOpenArchivingModal(true)}>
        {archivingName ? <Text>{archivingName}</Text> : <Text>{i18n.t('choiceArchiving')}</Text>}
        {/* TODO: 오른쪽 화살표 아이콘 추가 */}
      </ArchivingSelect>
      <ArchivingModal
        onClose={handleCloseModal}
        isVisible={openArchivingModal}
      />
      <Title>{i18n.t('contentName')}</Title>
      <TextInput
        placeholder={i18n.t('contentVerify')}
        value={contentName}
        onChangeText={setContentName}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        maxLength={15}
        style={[
          contentFocus ? Styles.inputFocus : null,
          !contentFocus && contentName.length > 0 ? Styles.inputWithValue : null,
        ]}
      />
      {/* TODO: Condition Icon 추가 */}
      <Condition style={[contentName.length > 0 ? Styles.conditionComplete : null]}>
        {i18n.t('contentVerify')}
      </Condition>

      <Title>{i18n.t('image')}</Title>
      {image ? (
        <TouchableOpacity onPress={handleUploadImage}>
          <Image source={image} />
        </TouchableOpacity>
      ) : (
        <PlusImageButton onPress={handleUploadImage}>
          <Text>+</Text>
        </PlusImageButton>
      )}
      <ActionSheet
        ref={actionSheetRef}
        title={i18n.t('uploadImage')}
        options={options}
        cancelButtonIndex={0}
        tintColor={colors.gray600}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
      <RowView>
        <Title>{i18n.t('tag')}</Title>
        <Text>{i18n.t('choice10')}</Text>
      </RowView>
      <RowView>
        <ScrollView horizontal={true}>
          <AddTagButton onPress={() => navigation.navigate('CreateTag')}>
            <AddTagText>{`+ ${i18n.t('addTag')}`}</AddTagText>
          </AddTagButton>
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
        </ScrollView>
      </RowView>
      <RowView>
        <Title>{i18n.t('memo')}</Title>
        <Text>{i18n.t('choice')}</Text>
      </RowView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={160}
      >
        <TextInput
          placeholder={i18n.t('placeHolderMemo')}
          value={memo}
          onChangeText={setMemo}
          onFocus={handleMemoFocus}
          onBlur={handleMemoBlur}
          maxLength={150}
          multiline
          style={[
            memoFocus ? Styles.inputFocus : null,
            !memoFocus && memo.length > 0 ? Styles.inputWithValue : null,
          ]}
        />
      </KeyboardAvoidingView>
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handlesubmit}
        isDisabled={!archivingName || !contentName || !image}
      />
    </Container>
  )
}

const options = [
  i18n.t('cancel'),
  i18n.t('selectFromPhotoLibrary'),
  i18n.t('selectFromFile'),
  i18n.t('selectFromCamera'),
]
