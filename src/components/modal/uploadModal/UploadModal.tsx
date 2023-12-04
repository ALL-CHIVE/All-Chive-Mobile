import React from 'react'

import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import { defaultIcons } from '@/assets'
import UploadIcon from '@/assets/icons/upload.svg'
import i18n from '@/locales'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import {
  Container,
  Icon,
  LeftButton,
  RightButton,
  Styles,
  Title,
  UploadButton,
} from './UploadModal.style'

interface UploadModalProps {
  onClose: () => void
}

/**
 * UploadModal
 */
const UploadModal = ({ onClose }: UploadModalProps) => {
  const { navigate } = useNavigation<MainNavigationProp>()

  return (
    <Container>
      <LinearGradient
        style={Styles.linearGradient}
        colors={['rgba(255, 255, 255, 0.7)', colors.yellow600]}
      >
        <LinearGradient
          style={Styles.uploadButton}
          colors={[colors.yellow500, colors.mainYellow]}
        >
          <UploadButton>
            <UploadIcon />
          </UploadButton>
        </LinearGradient>
        <LeftButton
          onPress={() => {
            onClose()
            navigate('Upload', { type: ContentType.Image })
          }}
        >
          <Icon source={defaultIcons.photo} />
          <Title>{i18n.t('image')}</Title>
        </LeftButton>
        <RightButton
          onPress={() => {
            onClose()
            navigate('Upload', { type: ContentType.Link })
          }}
        >
          <Icon source={defaultIcons.linkUpload} />
          <Title>{i18n.t('link')}</Title>
        </RightButton>
      </LinearGradient>
    </Container>
  )
}

export default UploadModal
