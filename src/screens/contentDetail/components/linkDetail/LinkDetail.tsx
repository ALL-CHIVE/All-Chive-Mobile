import React, { useEffect, useState } from 'react'

import { ImageURISource } from 'react-native'

import { defaultImages } from '@/assets'
import i18n from '@/locales'
import { GetContentsResponse } from '@/models/Contents'
import { openInappBrowser } from '@/services/InappBrowser'
import { MetaData, getLinkOgTags } from '@/services/LinkService'

import {
  Container,
  Description,
  LinkPreview,
  LinkText,
  TextContainer,
  Title,
} from './LinkDetail.style'

interface LinkDetailProps {
  content: GetContentsResponse
}

/**
 * LinkDetail
 */
const LinkDetail = ({ content }: LinkDetailProps) => {
  const [ogTags, setOgTags] = useState<MetaData | undefined>(undefined)
  const [isImageError, setIsImageError] = useState(false)

  useEffect(() => {
    if (content.link) {
      getLinkOgTags(content.link).then((res) => {
        setOgTags(res)
      })
    }
  }, [content.link])

  if (!ogTags) {
    return <></>
  }

  return (
    <Container onPress={() => openInappBrowser(content.link)}>
      <LinkPreview
        source={
          !isImageError && ogTags && ogTags['image']
            ? { uri: ogTags['image'] }
            : defaultImages.content
        }
        onError={() => setIsImageError(true)}
        defaultSource={defaultImages.content as ImageURISource}
      />
      <TextContainer>
        <Title numberOfLines={1}>
          {ogTags && ogTags['title'] ? ogTags['title'] : i18n.t('noTitle')}
        </Title>
        <Description numberOfLines={1}>
          {ogTags && ogTags['description'] ? ogTags['description'] : i18n.t('noDescription')}
        </Description>
        <LinkText numberOfLines={1}>{content.link}</LinkText>
      </TextContainer>
    </Container>
  )
}

export default LinkDetail
