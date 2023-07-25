import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import {
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import { useMutation } from 'react-query'
import { useRecoilValue } from 'recoil'

import { defaultIcons, defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { DropDown } from '@/components/dropDown/DropDown'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'
import { createCancelConfirmAlert } from '@/services/Alert'
import { checkAndRequestPermission } from '@/services/PermissionService'
import { handleCameraOpen, handleImageSelect } from '@/services/imagePicker'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'
import { colors } from '@/styles/colors'

import {
  CloseButton,
  Condition,
  Container,
  ModalTitle,
  NoticeText,
  PlusImageButton,
  Styles,
  Switch,
  TextInput,
  Title,
} from '../ArchivingModal.style'
import { patchArchiving } from '../apis/archiving'

interface EditArchivingModalProps {
  archivingId: number
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const EditArchivingModal = ({
  archivingId,
  onClose,
  isVisible,
}: EditArchivingModalProps) => {
  const [name, setName] = useState('')
  const [nameFocus, setNameFocus] = useState(false)
  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const selectedCategory = useRecoilValue(SelectCategoryState)
  const [publicStatus, setPublicStatus] = useState(false)

  const actionSheetRef = useRef<ActionSheet>(null)

  // TODO: 현재 아카이빙 정보 가져오기
  /**
   *
   */
  const { mutate: postArchivingMutate } = useMutation(
    () =>
      patchArchiving({
        archivingId: archivingId,
        title: name,
        imageUrl: image ? image.toString() : defaultImages.thumbnail.toString(),
        category: selectedCategory,
        publicStatus: publicStatus,
      }),
    {
      /**
       *
       */
      onSuccess: () => {
        onClose()
        // 리패치 필요
      },
    }
  )

  /**
   *
   */
  const handleNameFocus = () => {
    setNameFocus(true)
  }

  /**
   *
   */
  const handleNameBlur = () => {
    setNameFocus(false)
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
  const handleActionSheetMenu = async (index: DefaultMenuType) => {
    switch (index) {
      case DefaultMenuType.selectDefaultImage: {
        setImage(defaultImages.thumbnail)
        break
      }
      case DefaultMenuType.selectFromPhotoLibrary: {
        const permission = await checkAndRequestPermission(Permissions.PhotoLibrary)

        if (permission === 'blocked' || permission === 'denied') {
          createCancelConfirmAlert(
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
      case DefaultMenuType.selectFromCamera: {
        const permission = await checkAndRequestPermission(Permissions.Camera)

        if (permission === 'blocked' || permission === 'denied') {
          createCancelConfirmAlert(
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
  const toggleSwitch = () => {
    setPublicStatus((prev) => !prev)
  }

  /**
   *
   */
  const handleSubmit = () => {
    postArchivingMutate()
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        // backdropOpacity={0.5}
        style={{
          margin: 0,
        }}
      >
        <Container>
          <ScrollView>
            <CloseButton onPress={onClose}>
              <Image source={defaultIcons.grayCloseButton} />
            </CloseButton>
            <ModalTitle>{i18n.t('editArchiving')}</ModalTitle>
            <Title>{i18n.t('archivingName')}</Title>
            <TextInput
              placeholder={i18n.t('contentVerify')}
              value={name}
              onChangeText={setName}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              maxLength={15}
              style={[
                nameFocus ? Styles.inputFocus : null,
                !nameFocus && name.length > 0 ? Styles.inputWithValue : null,
              ]}
            />
            {/* TODO: Condition Icon 추가 */}
            <Condition style={[name.length > 0 ? Styles.conditionComplete : null]}>
              {i18n.t('contentVerify')}
            </Condition>
            <Title>{i18n.t('category')}</Title>
            <DropDown />
            <Title>{i18n.t('thumbnail')}</Title>
            {image ? (
              <TouchableOpacity onPress={handleUploadImage}>
                <Image source={image} />
              </TouchableOpacity>
            ) : (
              <PlusImageButton onPress={handleUploadImage}>
                {/* TODO: + icon으로 변경 */}
                <Text>+</Text>
              </PlusImageButton>
            )}
            <ActionSheet
              ref={actionSheetRef}
              title={i18n.t('settingThumbnail')}
              options={DefalutMenus()}
              cancelButtonIndex={0}
              tintColor={colors.gray600}
              onPress={handleActionSheetMenu}
              theme="ios"
            />
            <View style={{ flexDirection: 'row' }}>
              <Title>{i18n.t('settingPublic')}</Title>
              <Switch
                trackColor={{ false: colors.gray100, true: colors.mainYellow }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.gray100}
                onValueChange={toggleSwitch}
                value={publicStatus}
              />
            </View>
            <NoticeText>{i18n.t('guideSettingPublic')}</NoticeText>
            <BoxButton
              textKey={i18n.t('confirm')}
              onPress={handleSubmit}
              // isDisabled
            />
          </ScrollView>
        </Container>
      </Modal>
    </>
  )
}
