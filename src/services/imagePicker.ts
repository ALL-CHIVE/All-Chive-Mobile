import DocumentPicker from 'react-native-document-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

/**
 * handleImageSelect
 */
export const handleImageSelect = async () => {
  try {
    return await launchImageLibrary({
      mediaType: 'photo',
    })
  } catch (error) {
    // ignore
  }
}

/**
 * handleCameraOpen
 */
export const handleCameraOpen = async () => {
  try {
    return await launchCamera({
      mediaType: 'photo',
    })
  } catch (error) {
    //ignore
  }
}

/**
 *
 */
export const handleFileOpen = async () => {
  try {
    return await DocumentPicker.pickSingle({
      type: 'images',
    })
  } catch (error) {
    // ignore
  }
}
