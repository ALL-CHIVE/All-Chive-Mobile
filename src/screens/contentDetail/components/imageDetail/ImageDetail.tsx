import React, { useState } from 'react'

import { Modal, Text, TouchableOpacity } from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer'

import { Content } from '@/models/Content'
import {
  Container,
  ImagePreview,
} from '@/screens/contentDetail/components/imageDetail/ImageDetail.style'

interface Props {
  content: Content
}

/**
 * ImageDetail
 */
const ImageDetail = ({ content }: Props) => {
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
          onSwipeDown={() => setModalVisible(false)}
        />
      </Modal>
    </Container>
  )
}

export default ImageDetail
