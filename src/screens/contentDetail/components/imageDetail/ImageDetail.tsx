import React, { useState } from 'react'

import { Modal, Text, TouchableOpacity } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { Content } from '@/models/Content'
import {
  Container,
  ImagePreview,
} from '@/screens/contentDetail/components/imageDetail/ImageDetail.style'

import ImageHeader from './components/ImageHeader'

interface ImageDetailProps {
  content: Content
}

/**
 * ImageDetail
 */
const ImageDetail = ({ content }: ImageDetailProps) => {
  const [isModalVisible, setModalVisible] = useState(false)

  return (
    <Container>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImagePreview source={{ uri: content.uri }} />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <ImageViewer
          imageUrls={[{ url: content.uri }]}
          renderIndicator={(_currentIndex, _allSize) => <Text></Text>}
          enableSwipeDown={true}
          renderHeader={() => (
            <ImageHeader
              title={content.title}
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
