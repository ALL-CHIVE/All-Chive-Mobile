import React from 'react'

import { TouchableOpacity, Alert, Platform, Linking } from 'react-native'
import { InAppBrowser, InAppBrowserOptions } from 'react-native-inappbrowser-reborn'
import { InAppBrowseriOSOptions } from 'react-native-inappbrowser-reborn'
import { InAppBrowserAndroidOptions } from 'react-native-inappbrowser-reborn'

import { Content } from '@/models/Content'

import { LinkPreview } from './LinkDetail.style'

interface LinkDetailProps {
  content: Content
}

/**
 * LinkDetail
 */
const LinkDetail = ({ content }: LinkDetailProps) => {
  /**
   * 인앱 브라우저를 엽니다.
   */
  const openInappBrowser = async () => {
    try {
      if (!content?.uri) {
        return
      }

      const isAvailable = await InAppBrowser.isAvailable()

      if (isAvailable) {
        InAppBrowser.open(content.uri, getInAppBrowserOptions())
        return
      }

      throw new Error('can not open inapp browser')
    } catch (error) {
      Linking.openURL(content.uri)
    }
  }

  return (
    <TouchableOpacity onPress={() => openInappBrowser()}>
      <LinkPreview source={{ uri: content.ogTag?.image_url }} />
    </TouchableOpacity>
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
