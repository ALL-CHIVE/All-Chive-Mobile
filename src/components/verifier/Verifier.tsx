import React from 'react'

import i18n from '@/locales'

import { Container, Text } from './Verifier.style'

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
      {/* TODO: icon 연결 */}
      {isValid ? <Text>V</Text> : <Text>X</Text>}
      <Text>{i18n.t(text)}</Text>
    </Container>
  )
}

export default Verifier
