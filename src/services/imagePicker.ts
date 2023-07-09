import ImageCropPicker from 'react-native-image-crop-picker'

/**
 * handleImageSelect
 */
export const handleImageSelect = async () => {
  try {
    return await ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
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
      cropping: true,
    })
  } catch (error) {
    //ignore
  }
}
