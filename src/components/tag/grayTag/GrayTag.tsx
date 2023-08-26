import React from 'react'

import { TouchableOpacity } from 'react-native'

import XMark from '@/assets/icons/x-mark.svg'
import { colors } from '@/styles/colors'

import { Container, RemoveButton, RowView, Text } from './GrayTag.style'

interface GrayTagProps {
  tag: string
  onRemove?: () => void
}

/**
 * GrayTag Components
 */
export const GrayTag = ({ tag, onRemove }: GrayTagProps) => {
  return (
    <>
      <Container>
        <RowView>
          <Text>{tag}</Text>
          <RemoveButton onPress={onRemove}>
            <XMark
              width={15}
              height={15}
              color={colors.white}
            />
          </RemoveButton>
        </RowView>
      </Container>
    </>
  )
}
