import React from 'react'

import { Image } from 'react-native'

import { defaultImages } from '@/assets'
import i18n from '@/locales'

import { Container, Description, Title } from './Loading.style'

/**
 * 로딩
 */
export const Loading = () => {
  return (
    <Container>
      <Image source={defaultImages.loading} />
      <Title>{i18n.t('loading')}</Title>
      <Description>{i18n.t('pleaseWait')}</Description>
    </Container>
  )
}
