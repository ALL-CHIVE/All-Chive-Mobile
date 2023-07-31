import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { defaultIcons } from '@/assets'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import { Container, Icon, LeftButton, RightButton, Styles, UploadButton } from './UploadModal.style'

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
        colors={[colors.white, colors.yellow600]}
      >
        <LinearGradient
          style={Styles.uploadButton}
          colors={[colors.yellow500, colors.mainYellow]}
        >
          <UploadButton>
            <Image
              source={defaultIcons.upload}
              resizeMode="contain"
            />
          </UploadButton>
        </LinearGradient>
        <LeftButton
          onPress={() => {
            onClose()
            navigate('ImageUpload')
          }}
        >
          <Icon source={defaultIcons.photo} />
          <Text>{i18n.t('image')}</Text>
        </LeftButton>
        <RightButton
          onPress={() => {
            onClose()
            navigate('LinkUpload')
          }}
        >
          <Icon source={defaultIcons.link} />
          <Text>{i18n.t('link')}</Text>
        </RightButton>
      </LinearGradient>
    </Container>
  )
}

export default UploadModal
