import React from 'react'

import { TagContainer, TagText } from './Tag.style'

interface Props {
  tag: string
}

/**
 * Tag Components
 */
const Tag = ({ tag }: Props) => {
  return (
    <TagContainer>
      <TagText>{tag}</TagText>
    </TagContainer>
  )
}

export default Tag
