import React, { useState } from 'react'

import { ImageURISource, Modal, Text, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import ImageView from 'react-native-image-viewing'

import { defaultImages } from '@/assets'
import { GetContentsResponse } from '@/models/Contents'
import {
  Container,
  ImagePreview,
} from '@/screens/contentDetail/components/imageDetail/ImageDetail.style'

import ImageHeader from './components/ImageHeader'

interface ImageDetailProps {
  content: GetContentsResponse
}

/**
 * ImageDetail
 */
const ImageDetail = ({ content }: ImageDetailProps) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [isImageError, setIsImageError] = useState(false)

  return (
    <Container>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImagePreview
          source={isImageError ? defaultImages.content : { uri: content.imgUrl }}
          onError={() => setIsImageError(true)}
          defaultSource={defaultImages.content as ImageURISource}
        />
      </TouchableOpacity>

      <ImageView
        images={[
          isImageError ? (defaultImages.content as ImageURISource) : { uri: content.imgUrl },
        ]}
        FooterComponent={() => <Text></Text>}
        HeaderComponent={() => (
          <ImageHeader
            title={content.contentTitle}
            onClose={() => setModalVisible(false)}
          />
        )}
        imageIndex={0}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      />
    </Container>
  )
}

export default ImageDetail
