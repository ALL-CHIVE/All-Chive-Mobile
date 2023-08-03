import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { postArchiving } from '@/apis/archiving'
import { defaultIcons, defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { DropDown } from '@/components/dropDown/DropDown'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
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
  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const [publicStatus, setPublicStatus] = useState(false)

  const actionSheetRef = useRef<ActionSheet>(null)

  /**
   *
   */
  const { mutate: postArchivingMutate } = useMutation(
    () =>
      postArchiving({
        title: name,
        imageUrl: '',
        category: selectedCategory,
        publicStatus: publicStatus,
      }),
    {
      /**
       *
       */
      onSuccess: () => {
        setName('')
        setImage('')
        setSelectedCategory('')
        setPublicStatus(false)
        onClose()
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
    const selectedImage = await handleDefaultImageMenu(index)

    if (!selectedImage) {
      return
    }

    switch (selectedImage) {
      case 'default':
        setImage(defaultImages.thumbnail)
        break
      default:
        setImage({ uri: selectedImage })
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
