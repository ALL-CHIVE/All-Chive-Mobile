import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { throttle } from 'lodash'
import { ImageSourcePropType, ImageURISource, View } from 'react-native'
import Modal from 'react-native-modal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useRecoilState, useRecoilValue } from 'recoil'

import { getArchivingData, patchArchiving } from '@/apis/archiving/Archiving'
import { defaultImages } from '@/assets'
import CameraIcon from '@/assets/icons/camera.svg'
import XMark from '@/assets/icons/x-mark.svg'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { InformationErrorDialog } from '@/components/dialogs/errorDialog/InformationErrorDialog/InformationErrorDialog'
import { DropDown } from '@/components/dropDown/DropDown'
import Indicator from '@/components/indicator/Indicator'
import { Loading } from '@/components/loading/Loading'
import TextInput from '@/components/textInput/TextInput'
import Verifier from '@/components/verifier/Verifier'
import useText from '@/hooks/useText'
import i18n from '@/locales'
import { DefalutMenus, DefaultMenuType } from '@/models/enums/ActionSheetType'
import { handleDefaultImageMenu } from '@/services/ActionSheetService'
import { uploadArchivingImage } from '@/services/ImageService'
import { keyboardListener } from '@/services/KeyboardService'
import { modalMaxHeight } from '@/services/SizeService'
import { checkTitle } from '@/services/StringChecker'
import { getActionSheetTintColor } from '@/services/StyleService'
import { CategoryState } from '@/state/CategoryState'
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
  Thumbnail,
  Title,
} from '../ArchivingModal.style'

interface EditArchivingModalProps {
  archivingId: number
  onClose: () => void
  isVisible: boolean
}

const defaultModalHeight = 624

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

  const [image, setImage] = useState<ImageSourcePropType>()
  const [publicStatus, setPublicStatus] = useState(false)
  const [modalHight, setModalHeight] = useState(defaultModalHeight)
  const [errorDialogVisible, setErrorDialogVisible] = useState(false)
  const {
    text: title,
    isValid: isTitleValid,
    updateText: updateTitle,
    clearText: clearTitle,
  } = useText(checkTitle)

  const [selectedCategory, setSelectedCategory] = useRecoilState(SelectCategoryState)
  const currentCategory = useRecoilValue(CategoryState)

  useEffect(() => keyboardListener(keyboardDidShow, keyboardDidHide), [isVisible])

  /**
   * keyboardDidShow
   */
  const keyboardDidShow = () => {
    const height = modalMaxHeight
    height && setModalHeight(height)
  }

  /**
   * keyboardDidHide
   */
  const keyboardDidHide = () => {
    setModalHeight(defaultModalHeight)
  }

  const { data: archivingData, isLoading } = useQuery(
    ['archiving', archivingId],
    () => getArchivingData(archivingId),
    {
      enabled: isVisible && archivingId !== -1,
      /**
       * onSuccess 시 데이터를 세팅합니다.
       */
      onSuccess: (data) => {
        updateTitle(data.title)
        data.imageUrl && setImage({ uri: data.imageUrl })
        setSelectedCategory(data.category)
        setPublicStatus(data.publicStatus)
      },
      /**
       *
       */
      onError: () => {
        setErrorDialogVisible(true)
      },
    }
  )

  /**
   *
   */
  const updateArchiving = async () => {
    const imageUrl = (image as ImageURISource)?.uri ?? ''
    let archivingImageUrl = ''

    if (imageUrl) {
      archivingImageUrl = await uploadArchivingImage(imageUrl)
    }

    await patchArchiving(
      archivingId,
      title,
      image ? archivingImageUrl : '',
      selectedCategory,
      publicStatus
    )
  }

  /**
   *
   */
  const { mutate: updateArchivingMutate, isLoading: isUploading } = useMutation(updateArchiving, {
    /**
     * updateArchivingMutate 성공 시 홈 화면과 해당 아카이빙 화면을 리패치합니다.
     * 해당 Modal을 아카이빙 관리 페이지에서도 사용하므로 archivingList도 리패치합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries([`contentByArchiving`, archivingId])
      queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
      queryClient.invalidateQueries(['archivingList'])
      queryClient.invalidateQueries(['getCommunityArchivingList'])
      queryClient.invalidateQueries(['getScrapArchivingList'])
      queryClient.invalidateQueries(['getPopularArchivings'])
      onClose()
    },
  })

  const throttledUpdateArchivingMutate = throttle(updateArchivingMutate, 5000)

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

  return (
    <>
      {isLoading && <Loading />}
      <InformationErrorDialog
        isVisible={errorDialogVisible}
        onRetry={() => {
          setErrorDialogVisible(false)
          queryClient.invalidateQueries(['archiving', archivingId])
        }}
        onClick={() => {
          setErrorDialogVisible(false)
        }}
      />
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.5}
        statusBarTranslucent={true}
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
            <ModalTitle>{i18n.t('editArchiving')}</ModalTitle>
            <Title>{i18n.t('archivingName')}</Title>
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
              text="titleVerify"
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
            textKey={i18n.t('complete')}
            onPress={() => throttledUpdateArchivingMutate()}
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
