import React from 'react'

import { Text } from 'react-native'

import { TagContainer } from '@/components/ContentCard/ContentCard.style'

import { Styles } from './WhiteTag.style'

interface Props {
  tag: string
  isGray?: boolean
}

/**
 * WhiteTag Components
 */
export const WhiteTag = ({ tag, isGray }: Props) => {
  return (
    <TagContainer>
      {isGray ? <Text style={Styles.Gray}>{tag}</Text> : <Text style={Styles.Black}>{tag}</Text>}
    </TagContainer>
  )
}
