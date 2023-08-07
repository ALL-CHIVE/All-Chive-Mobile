import React, { useEffect, useState } from 'react'

import { Platform, Linking } from 'react-native'
import { InAppBrowser, InAppBrowserOptions } from 'react-native-inappbrowser-reborn'
import { InAppBrowseriOSOptions } from 'react-native-inappbrowser-reborn'
import { InAppBrowserAndroidOptions } from 'react-native-inappbrowser-reborn'

import { defaultImages } from '@/assets'
import i18n from '@/locales'
import { GetContentsResponse } from '@/models/Contents'
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

  useEffect(() => {
    if (content.link) {
      getLinkOgTags(content.link).then((res) => {
        setOgTags(res)
      })
    }
  }, [content.link])

  /**
   * 인앱 브라우저를 엽니다.
   */
  const openInappBrowser = async () => {
    try {
      if (!content?.link) {
        return
      }

      const isAvailable = await InAppBrowser.isAvailable()

      if (isAvailable) {
        InAppBrowser.open(content.link, getInAppBrowserOptions())
        return
      }

      throw new Error('can not open inapp browser')
    } catch (error) {
      try {
        Linking.openURL(content.link)
      } catch (error) {
        return
      }
    }
  }

  if (!ogTags) {
    return <></>
  }

  return (
    <Container onPress={() => openInappBrowser()}>
      <LinkPreview
        source={ogTags && ogTags['image'] ? { uri: ogTags['image'] } : defaultImages.content}
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

/**
 * OS에 따른 InAppBrowserOptions을 가져옵니다.
 */
const getInAppBrowserOptions = () => {
  return Platform.select<InAppBrowserOptions>({
    ios: {
      dismissButtonStyle: 'close',
      animated: true,
      enableBarCollapsing: false,
    } as InAppBrowseriOSOptions,
    android: {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: true,
    } as InAppBrowserAndroidOptions,
  })
}

export default LinkDetail
