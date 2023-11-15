import React, { useState } from 'react'

import { Image, ImageSourcePropType } from 'react-native'
import Modal from 'react-native-modal'

import DialogButton from '@/components/buttons/dialogButton/DialogButton'
import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { Styles, Container, Title, Description, Buttons } from './TwoButtonDialog.style'

interface TwoButtonDialogProps {
  isVisible: boolean
  title: string
  imageUrl?: ImageSourcePropType
  description?: string
  completeText: string
  onCancel: () => void
  onComplete: () => void
  onClose?: (isComplete: boolean) => void
}

/**
 * TwoButtonDialog
 */
const TwoButtonDialog = ({
  isVisible,
  title,
  imageUrl,
  description,
  completeText,
  onCancel,
  onComplete,
  onClose,
}: TwoButtonDialogProps) => {
  const [isComplete, setIsComplete] = useState(false)

  /**
   * handleComplete
   */
  const handleComplete = () => {
    setIsComplete(true)
    onComplete()
  }

  return (
    <Modal
      style={Styles.modal}
      statusBarTranslucent={true}
      isVisible={isVisible}
      onModalHide={() => onClose && onClose(isComplete)}
    >
      <Container>
        <Title>{i18n.t(title)}</Title>
        {imageUrl && (
          <Image
            style={{ width: 164, height: 144 }}
            source={imageUrl}
          />
        )}
        {description && <Description>{i18n.t(description)}</Description>}
        <Buttons>
          <DialogButton
            title="cancel"
            onPress={onCancel}
            color={colors.white}
            backgroundColor={colors.gray500}
          />
          <DialogButton
            title={completeText}
            onPress={handleComplete}
            color={colors.gray500}
            backgroundColor={colors.mainYellow}
          />
        </Buttons>
      </Container>
    </Modal>
  )
}

export default TwoButtonDialog
