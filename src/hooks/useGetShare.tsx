import { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Platform } from 'react-native'
import ReceiveSharingIntent from 'react-native-receive-sharing-intent'

import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'

export type ShareFile = {
  filePath?: string
  text?: string
  weblink?: string
  mimeType?: string
  contentUri?: string
  fileName?: string
  extension?: string
}

/**
 * useGetShare
 */
const useGetShare = () => {
  const { navigate } = useNavigation<MainNavigationProp>()

  useEffect(() => {
    // To get All Recived Urls
    ReceiveSharingIntent.getReceivedFiles(
      (files: ShareFile[]) => {
        updateFiles(files[0])
      },
      (error: any) => {
        //ignore
      },
      'AllChive' // share url protocol
    )

    // To clear Intents
    return ReceiveSharingIntent.clearReceivedFiles
  }, [])

  /**
   * updateFiles
   */
  const updateFiles = (file: ShareFile) => {
    if (!file) {
      return
    }

    if (file.filePath) {
      navigate('Upload', {
        type: ContentType.Image,
        data: `${getImagePrefix()}${file.filePath}`,
      })
    } else if (file.weblink) {
      navigate('Upload', { type: ContentType.Link, data: file.weblink })
    }
  }
}

/**
 * getImagePrefix
 */
const getImagePrefix = () => {
  return Platform.select({ ios: '', android: 'file://' })
}

export default useGetShare
