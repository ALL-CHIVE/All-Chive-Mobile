import React, { useState } from 'react'

import { Modal, Text, TouchableOpacity } from 'react-native'
import Config from 'react-native-config'
import ImageView from 'react-native-image-viewing'

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

  return (
    <Container>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <ImagePreview source={{ uri: `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${content.imgUrl}` }} />
      </TouchableOpacity>

      <ImageView
        images={[{ uri: `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${content.imgUrl}` }]}
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
