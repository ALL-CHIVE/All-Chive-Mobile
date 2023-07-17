import React from 'react'

import { Text, TouchableOpacity } from 'react-native'

import { GrayTagContainer, Styles, WhiteTagContainer } from './Tag.style'

interface TagProps {
  tag: string
  isGray: boolean
  onRemove?: () => void
}

/**
 * Tag Components
 */
export const Tag = ({ tag, isGray, onRemove }: TagProps) => {
  return (
    <>
      {isGray ? (
        <GrayTagContainer>
          <Text style={Styles.White}>{tag}</Text>
          <TouchableOpacity onPress={onRemove}>
            <Text style={Styles.White}>X</Text>
          </TouchableOpacity>
        </GrayTagContainer>
      ) : (
        <WhiteTagContainer>
          <Text style={Styles.Gray}>{tag}</Text>
        </WhiteTagContainer>
      )}
    </>
  )
}
