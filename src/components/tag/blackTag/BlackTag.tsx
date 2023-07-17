import React from 'react'

import { TouchableOpacity } from 'react-native'

import { TagContainer, TagText } from './BlackTag.style'

interface Props {
  tag: string
  onRemove: () => void
}

/**
 * Black Tag Components
 */
export const BlackTag = ({ tag, onRemove }: Props) => {
  return (
    <TagContainer>
      <TagText>{tag}</TagText>
      {/* TODO: Icon으로 변경 */}
      <TouchableOpacity onPress={onRemove}>
        <TagText>X</TagText>
      </TouchableOpacity>
    </TagContainer>
  )
}
