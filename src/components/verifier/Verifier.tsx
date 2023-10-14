import React from 'react'

import Check from '@/assets/icons/check.svg'
import XMark from '@/assets/icons/x-mark.svg'
import i18n from '@/locales'
import { colors } from '@/styles/colors'

import { Container, Styles, Text } from './Verifier.style'

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
        <Check
          width={18}
          height={13}
        />
      ) : (
        <XMark
          width={18}
          height={18}
          color={colors.red}
        />
      )}
      <Text style={!isValid && Styles.inValidText}>{i18n.t(text)}</Text>
    </Container>
  )
}

export default Verifier
