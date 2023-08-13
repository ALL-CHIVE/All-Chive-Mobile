import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import {
  Image,
  ImageSourcePropType,
  ImageURISource,
  Keyboard,
  KeyboardEvent,
  TouchableOpacity,
  View,
} from 'react-native'
import Config from 'react-native-config'
import Modal from 'react-native-modal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getArchivingData, patchArchiving } from '@/apis/archiving'
import { defaultIcons, defaultImages } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { DropDown } from '@/components/dropDown/DropDown'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
import { uploadArchivingImage } from '@/services/ImageService'
import { CategoryState } from '@/state/CategoryState'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'
import { colors } from '@/styles/colors'

import {
  Bottom,
  CloseButton,
  Condition,
  Container,
  Header,
  ModalTitle,
  NoticeText,
  ScrollContainer,
  Styles,
  Switch,
  TextInput,
  Thumbnail,
  Title,
} from './EditArchivingModal.style'

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
  const queryClient = useQueryClient()
  const actionSheetRef = useRef<ActionSheet>(null)

  const [name, setName] = useState('')
  const [nameFocus, setNameFocus] = useState(false)
  const [image, setImage] = useState<ImageSourcePropType>()
  const [publicStatus, setPublicStatus] = useState(false)
  const [modalHight, setModalHeight] = useState(624)
  const [imageKey, setImageKey] = useState('')

  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const currentCategory = useRecoilValue(CategoryState)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  /**
   *
   */
  const keyboardDidShow = (event: KeyboardEvent) => {
    setModalHeight(event.endCoordinates.screenY - 10)
  }

  /**
   *
   */
  const keyboardDidHide = () => {
    setModalHeight(624)
  }

  const { data: archivingData } = useQuery(
    ['archiving', archivingId],
    () => getArchivingData(archivingId),
    {
      /**
       * onSuccess 시 데이터를 세팅합니다.
       */
      onSuccess: (data) => {
        setName(data.title)
        setImageKey(data.imageUrl)
        data.imageUrl && setImage({ uri: `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${data.imageUrl}` })
        setSelectedCategory(data.category)
        setPublicStatus(data.markStatus)
      },
    }
  )

  /**
   *
   */
  const { mutate: patchArchivingMutate } = useMutation(
    () =>
      patchArchiving({
        archivingId: archivingId,
        title: name,
        imageUrl: image ? imageKey : '',
        category: selectedCategory,
        publicStatus: publicStatus,
      }),
    {
      /**
       * patchArchivingMutate 성공 시 홈 화면과 해당 아카이빙 화면을 리패치합니다.
       * 해당 Modal을 아카이빙 관리 페이지에서도 사용하므로 archivingList도 리패치합니다.
       */
      onSuccess: () => {
        queryClient.invalidateQueries([`contentByArchiving${archivingId}`, archivingId])
        queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
        queryClient.invalidateQueries(['archivingList'])
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
        setImage(undefined)
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
  const handleSubmit = async () => {
    const imageUrl = (image as ImageURISource)?.uri ?? ''

    if (imageUrl) {
      const archivingImageUrl = await uploadArchivingImage(imageUrl, imageKey)
      archivingImageUrl && setImageKey(archivingImageUrl)
    }

    patchArchivingMutate()
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.5}
        style={{
          margin: 0,
        }}
      >
        <Container style={{ height: modalHight }}>
          <Header>
            <CloseButton onPress={onClose}>
              <Image source={defaultIcons.grayCloseButton} />
            </CloseButton>
          </Header>
          <ScrollContainer
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <ModalTitle>{i18n.t('editArchiving')}</ModalTitle>
            <Title>{i18n.t('archivingName')}</Title>
            <TextInput
              placeholder={i18n.t('contentVerify')}
              value={name}
              onChangeText={setName}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              maxLength={15}
              style={
                (nameFocus && Styles.inputFocus) ||
                (!nameFocus && name.length > 0 && Styles.inputWithValue)
              }
            />
            {/* TODO: Condition Icon 추가 */}
            <Condition style={[name.length > 0 ? Styles.conditionComplete : null]}>
              {i18n.t('contentVerify')}
            </Condition>
            <Title>{i18n.t('category')}</Title>
            <DropDown />
            <Title>{i18n.t('thumbnail')}</Title>
            <TouchableOpacity onPress={handleUploadImage}>
              <Thumbnail
                source={image ? image : defaultImages.thumbnail}
                defaultSource={defaultImages.thumbnail as ImageURISource}
              />
            </TouchableOpacity>
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
            <Bottom />
          </ScrollContainer>
          <BoxButton
            textKey={i18n.t('confirm')}
            onPress={handleSubmit}
            isDisabled={!name || !selectedCategory}
          />
        </Container>
      </Modal>
      <ActionSheet
        ref={actionSheetRef}
        title={i18n.t('settingThumbnail')}
        options={DefalutMenus()}
        cancelButtonIndex={0}
        tintColor={colors.gray600}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </>
  )
}
