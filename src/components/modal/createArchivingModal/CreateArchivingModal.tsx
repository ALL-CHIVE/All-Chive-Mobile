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
import { DefaultMenuType } from '@/models/enums/ActionSheetType'
import { Permissions } from '@/models/enums/Permissions'
import { createCancelConfirmAlert } from '@/services/Alert'
import { checkPermission } from '@/services/PermissionService'
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
} from './CreateArchivingModal.style'
import { postArchiving } from './apis/postArchiving'

interface CreateArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const CreateArchivingModal = ({ onClose, isVisible }: CreateArchivingModalProps) => {
  const [name, setName] = useState('')
  const [nameFocus, setNameFocus] = useState(false)
  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const selectedCategory = useRecoilValue(SelectCategoryState)
  const [publicStatus, setPublicStatus] = useState(false)

  const actionSheetRef = useRef<ActionSheet>(null)

  /**
   *
   */
  const { mutate } = useMutation(() =>
    postArchiving({
      title: name,
      imageUrl: '',
      category: selectedCategory,
      publicStatus: false,
    })
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
        const permission = await checkPermission(Permissions.PhotoLibrary)

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
        const permission = await checkPermission(Permissions.Camera)

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
    // mutate() & close modal
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
            <ModalTitle>{i18n.t('addArchiving')}</ModalTitle>
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
              options={options}
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
              textKey={i18n.t('add')}
              onPress={handleSubmit}
              // isDisabled
            />
          </ScrollView>
        </Container>
      </Modal>
    </>
  )
}

const options = [
  i18n.t('cancel'),
  i18n.t('selectDefaultImage'),
  i18n.t('selectFromPhotoLibrary'),
  i18n.t('selectFromCamera'),
]
