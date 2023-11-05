import React from 'react'

import { ImageSourcePropType } from 'react-native'
import Modal from 'react-native-modal'

import DialogButton from '@/components/buttons/dialogButton/DialogButton'
import i18n from '@/locales'
import { colors } from '@/styles/colors'

import {
  Css,
  Container,
  Title,
  Description,
  DialogImage,
  ButtonBorder,
} from './DefaultDialog.style'

interface DialogProps {
  isVisible: boolean
  title: string
  imageUrl: ImageSourcePropType
  imageWidth: number
  imageHeight: number
  description?: string
  buttonText: string
  onClose?: () => void
  onClick: () => void
}

/**
 * DefaultDialog
 */
const DefaultDialog = ({
  isVisible,
  title,
  imageUrl,
  imageWidth,
  imageHeight,
  description,
  buttonText,
  onClose,
  onClick,
}: DialogProps) => {
  return (
    <Modal
      style={Css.modal}
      isVisible={isVisible}
      statusBarTranslucent={true}
      onModalHide={onClose}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        <DialogImage
          source={imageUrl}
          style={{ width: imageWidth, height: imageHeight }}
        />
        {description && <Description>{i18n.t(description)}</Description>}
        <ButtonBorder>
          <DialogButton
            title={buttonText}
            onPress={onClick}
            color={colors.white}
            backgroundColor={colors.gray500}
          />
        </ButtonBorder>
      </Container>
    </Modal>
  )
}

export default DefaultDialog
