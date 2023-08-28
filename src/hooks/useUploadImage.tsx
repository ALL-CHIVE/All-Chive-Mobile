import { useState } from 'react'

/**
 *
 */
const useUploadImage = () => {
  const [isUploading, setIsUploading] = useState(false)

  /**
   * 이미지를 업로드합니다.
   */
  const upload = async (
    imageUrl: string,
    uploadFunction: (imageUri: string) => Promise<string>
  ) => {
    setIsUploading(true)
    const url = await uploadFunction(imageUrl)
    setIsUploading(false)

    return url
  }

  return {
    isUploading,
    upload,
  }
}

export default useUploadImage
