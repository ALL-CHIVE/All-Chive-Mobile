import React, { useState } from 'react'

import { Modal, Text, TouchableOpacity } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { GetContentsResponse } from '@/models/contents/Contents'
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

  return (
    <Container>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImagePreview source={{ uri: content.imgUrl }} />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <ImageViewer
          imageUrls={[{ url: content.imgUrl }]}
          renderIndicator={(_currentIndex, _allSize) => <Text></Text>}
          renderHeader={() => (
            <ImageHeader
              title={content.contentTitle}
              onClose={() => setModalVisible(false)}
            />
          )}
          failImageSource={{ url: 'fail_image_url' }}
        />
      </Modal>
    </Container>
  )
}

export default ImageDetail
