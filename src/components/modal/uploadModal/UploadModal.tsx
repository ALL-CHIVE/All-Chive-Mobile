import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { defaultIcons } from '@/assets'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import { Container, Icon, LeftButton, RightButton, Styles } from './UploadModal.style'

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
        colors={['rgba(255, 255, 255, 0.8)', colors.navbar]}
      >
        <LeftButton
          onPress={() => {
            onClose()
            navigate('ImageUpload')
          }}
        >
          <Icon source={defaultIcons.photo} />
          <Text>{i18n.t('photo')}</Text>
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
