import React from 'react'

import { Text } from 'react-native'

import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { CloseButtonHeader } from '@/components/header/closeButtonHeader/CloseButtonHeader'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, PlusTagButton, PlusTagText, Title } from './Tag.style'

interface TagProps {
  navigation: MainNavigationProp
}

/**
 *
 */
export const Tag = ({ navigation }: TagProps) => {
  /**
   *
   */
  const handleUploadTag = () => {
    // TODO: upload tag & navigate to LinkUpload
  }

  return (
    <Container>
      <CloseButtonHeader
        title="태그"
        onClose={() => navigation.goBack()}
      />
      {/* <SearchBar /> */}
      <Title>{`검색한 태그가 없습니다.\n 새로운 태그로 등록할까요?`}</Title>
      {/* TODO: 태그 등록하기 버튼 추가 */}
      <PlusTagButton>
        <PlusTagText>+ 태그 등록하기</PlusTagText>
      </PlusTagButton>
      <BoxButton
        textKey="완료"
        onPress={handleUploadTag}
      />
    </Container>
  )
}
