import React from 'react'

import { defaultIcons } from '@/assets'
import i18n from '@/locales'

import { Container, Icon, Text } from './Verifier.style'

interface VerifierProps {
  isValid: boolean
  text: string
}

/**
 * Verifier
 */
const Verifier = ({ isValid, text }: VerifierProps) => {
  return (
    <Container>
      {isValid ? (
        <Icon source={defaultIcons.check} />
      ) : (
        <Icon source={defaultIcons.grayCloseButton} />
      )}
      <Text>{i18n.t(text)}</Text>
    </Container>
  )
}

export default Verifier
