import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { throttle } from 'lodash'
import { ImageSourcePropType, ImageURISource, View } from 'react-native'
import Modal from 'react-native-modal'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { postArchiving } from '@/apis/archiving/Archiving'
import { defaultImages } from '@/assets'
import CameraIcon from '@/assets/icons/camera.svg'
import XMark from '@/assets/icons/x-mark.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { DropDown } from '@/components/dropDown/DropDown'
import Indicator from '@/components/indicator/Indicator'
import TextInput from '@/components/textInput/TextInput'
import Verifier from '@/components/verifier/Verifier'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
import { uploadArchivingImage } from '@/services/ImageService'
import { keyboardListener } from '@/services/KeyboardService'
import { modalMaxHeight } from '@/services/SizeService'
import { checkTitle } from '@/services/StringChecker'
import { getActionSheetTintColor } from '@/services/StyleService'
import { CategoryState, CommunityCategoryState } from '@/state/CategoryState'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'
import { colors } from '@/styles/colors'

import {
  Bottom,
  CloseButton,
  Container,
  Header,
  ImageButton,
  ModalTitle,
  NoticeText,
  ScrollContainer,
  Styles,
  Switch,
  TextInputContainer,
  Thumbnail,
  Title,
} from './CreateArchivingModal.style'

interface CreateArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

const defaultModalHeight = 624

/**
 *
 */
export const CreateArchivingModal = ({ onClose, isVisible }: CreateArchivingModalProps) => {
  const queryClient = useQueryClient()
  const actionSheetRef = useRef<ActionSheet>(null)

  const [title, setTitle] = useState('')
  const [nameFocus, setNameFocus] = useState(false)
  const [image, setImage] = useState<ImageSourcePropType>()
  const [publicStatus, setPublicStatus] = useState(false)
  const [modalHight, setModalHeight] = useState(defaultModalHeight)
  const [isTitleValid, setIsTitleValid] = useState(false)

  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const currentCategory = useRecoilValue(CategoryState)
  const communityCurrentCategory = useRecoilValue(CommunityCategoryState)

  useEffect(() => keyboardListener(keyboardDidShow, keyboardDidHide), [])

  /**
   *
   */
  const keyboardDidShow = () => {
    const height = modalMaxHeight
    height && setModalHeight(height)
    setNameFocus(true)
  }

  /**
   *
   */
  const keyboardDidHide = () => {
    setModalHeight(defaultModalHeight)
    setNameFocus(false)
  }

  /**
   *
   */
  const createArchiving = async () => {
    const imageUrl = (image as ImageURISource)?.uri ?? ''
    let archivingImageUrl = ''

    if (imageUrl) {
      archivingImageUrl = await uploadArchivingImage(imageUrl)
    }

    await postArchiving(title, archivingImageUrl, selectedCategory, publicStatus)
  }

  /**
   *
   */
  const { mutate: createArchivingMutate, isLoading: isUploading } = useMutation(createArchiving, {
    /**
     * createArchivingMutate 성공 시 해당 Modal의 data를 초기화하고,
     * SelectArchivingModal의 getArchivingList를 리패치합니다.
     * 해당 Modal을 아카이빙 관리 페이지에서도 사용하므로 archivingList도 리패치합니다.
     */
    onSuccess: () => {
      setTitle('')
      setImage(undefined)
      setSelectedCategory('')
      setPublicStatus(false)
      queryClient.invalidateQueries(['getArchivingList'])
      queryClient.invalidateQueries(['archivingList'])
      queryClient.invalidateQueries(['getUser'])
      queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])

      if (publicStatus) {
        queryClient.invalidateQueries(['getCommunityArchivingList', communityCurrentCategory])
        queryClient.invalidateQueries(['getScrapArchivingList'])
        queryClient.invalidateQueries(['getPopularArchivings'])
      }

      onClose()
    },
  })

  const throttledCreateArchivingMutate = throttle(createArchivingMutate, 5000)

  /**
   * 이미지를 업로드합니다.
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
  const handleChangeTitle = (title: string) => {
    setTitle(title)
    setIsTitleValid(checkTitle(title))
  }

  /**
   * handleClearTitle
   */
  const handleClearTitle = () => {
    setTitle('')
    setIsTitleValid(false)
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        statusBarTranslucent={true}
        backdropOpacity={0.5}
        style={{
          margin: 0,
        }}
      >
        {isUploading && <Indicator />}
        <Container style={{ height: modalHight }}>
          <Header>
            <CloseButton onPress={onClose}>
              <XMark color={colors.gray600} />
            </CloseButton>
          </Header>
          <ScrollContainer
            bounces={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <ModalTitle>{i18n.t('addArchiving')}</ModalTitle>
            <Title>{i18n.t('archivingName')}</Title>
            <TextInputContainer
              style={
                (nameFocus && Styles.inputFocus) ||
                (!nameFocus && title.length > 0 && Styles.inputWithValue)
              }
            >
              <TextInput
                value={title}
                placeholder={i18n.t('contentVerify')}
                maxLength={15}
                onChangeText={handleChangeTitle}
                handleClear={handleClearTitle}
              />
            </TextInputContainer>
            <Verifier
              isValid={isTitleValid}
              text="archivingVerify"
            />
            <Title>{i18n.t('category')}</Title>
            <DropDown />
            <Title>{i18n.t('thumbnail')}</Title>
            <ImageButton onPress={handleUploadImage}>
              <Thumbnail
                source={image ? image : defaultImages.thumbnail}
                defaultSource={defaultImages.thumbnail as ImageURISource}
              />
              <CameraIcon style={Styles.cameraIcon} />
            </ImageButton>
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
            textKey={i18n.t('add')}
            onPress={() => throttledCreateArchivingMutate()}
            isDisabled={!title || !selectedCategory}
          />
        </Container>
      </Modal>
      <ActionSheet
        ref={actionSheetRef}
        title={i18n.t('settingThumbnail')}
        options={DefalutMenus()}
        cancelButtonIndex={0}
        tintColor={getActionSheetTintColor()}
        onPress={handleActionSheetMenu}
        theme="ios"
      />
    </>
  )
}
