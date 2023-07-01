import React from 'react'

import { View, Text, TouchableOpacity } from 'react-native'

interface HeaderRightProps {
  src: string
  onPress: () => unknown
}

/**
 *
 */
const HeaderRight = ({ src, onPress }: HeaderRightProps) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        {/* TODO: 이미지 or 아이콘 연동 */}
        <Text>button</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HeaderRight
