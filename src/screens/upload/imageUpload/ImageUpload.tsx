import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import {
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { BoxButton } from '@/components/button/BoxButton'
import { CloseButtonHeader } from '@/components/header/closeButtonHeader/CloseButtonHeader'
import { ArchivingModal } from '@/components/modal/archivingModal/ArchivingModal'
import i18n from '@/locales'
import { ImageUploadMenuType } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { createCancleConfirmAlert } from '@/services/Alert'
import { checkPermission } from '@/services/PermissionService'
import { handleCameraOpen, handleImageSelect } from '@/services/imagePicker'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'
import { colors } from '@/styles/colors'

import {
  ArchivingSelect,
  Condition,
  Container,
  Image,
  PlusImageButton,
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

  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)

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
        title="업로드"
        onClose={() => navigation.navigate('BottomTab')}
      />
      <Title>아카이빙 이름</Title>
      <ArchivingSelect onPress={() => setOpenArchivingModal(true)}>
        {archivingName ? <Text>{archivingName}</Text> : <Text>아카이빙을 선택하세요</Text>}
        {/* TODO: 오른쪽 화살표 아이콘 추가 */}
      </ArchivingSelect>
      <ArchivingModal
        onClose={handleCloseModal}
        isVisible={openArchivingModal}
      />
      <Title>컨텐츠 이름</Title>
      <TextInput
        placeholder="한/영/특수문자 15자 이내로 입력하세요"
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
        한/영/특수문자 15자 이내로 입력하세요
      </Condition>

      <Title>이미지</Title>
      {image ? (
        <Image source={image} />
      ) : (
        <PlusImageButton onPress={handleUploadImage}>
          <Text>+</Text>
        </PlusImageButton>
      )}
      <ActionSheet
        ref={actionSheetRef}
        title={'이미지 업로드'}
        options={options}
        cancelButtonIndex={0}
        tintColor={colors.gray600}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
      <View style={{ flexDirection: 'row' }}>
        <Title>태그</Title>
        <Text>선택사항 (최대 10개)</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Tag')}>
        <Text>+ 태그 추가</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Title>메모</Title>
        <Text>선택사항</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={160}
      >
        <TextInput
          placeholder="메모를 입력하세요"
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
        textKey="완료"
        onPress={handlesubmit}
        isDisabled={!archivingName || !contentName || !image}
      />
    </Container>
  )
}

const options = [i18n.t('cancel'), i18n.t('selectFromPhotoLibrary'), i18n.t('selectFromCamera')]
