import DocumentPicker from 'react-native-document-picker'
import ImageCropPicker from 'react-native-image-crop-picker'

/**
 * handleImageSelect
 */
export const handleImageSelect = async () => {
  try {
    return await ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: false,
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
    return await ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping: false,
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
