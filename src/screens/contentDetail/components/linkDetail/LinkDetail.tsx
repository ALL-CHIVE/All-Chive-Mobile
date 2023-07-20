import React from 'react'

import { TouchableOpacity, Platform, Linking } from 'react-native'
import { InAppBrowser, InAppBrowserOptions } from 'react-native-inappbrowser-reborn'
import { InAppBrowseriOSOptions } from 'react-native-inappbrowser-reborn'
import { InAppBrowserAndroidOptions } from 'react-native-inappbrowser-reborn'

import { GetContentsResponse } from '@/models/contents/Contents'

import { LinkPreview } from './LinkDetail.style'

interface LinkDetailProps {
  content: GetContentsResponse
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
      Linking.openURL(content.link)
    }
  }

  return (
    <TouchableOpacity onPress={() => openInappBrowser()}>
      <LinkPreview source={{ uri: content.link }} />
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
