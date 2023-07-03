import React from 'react'

import { ScrollView } from 'react-native'
import { SearchBar } from 'react-native-screens'

import { BoxButton } from '@/components/button/BoxButton'
import { Category } from '@/components/category/Category'

import { ArchivingContainer, NicknameText, TitleText } from './Archiving.style'

/**
 *
 */
export const Archiving = () => {
  /**
   *
   */
  const handleUplaod = () => {
    // console.log('upload') // upload 화면으로 navigation
  }

  return (
    <>
      <ScrollView>
        <ArchivingContainer>
          <SearchBar />
          <NicknameText>다카이브님</NicknameText>
          <TitleText>{`현재까지 총 10개의\n아카이빙을\n저장하고 계세요!`}</TitleText>
          <Category
            text="푸드"
            onPress={handleUplaod}
          />
          <BoxButton
            text="default"
            onPress={handleUplaod}
            buttonStyle="default"
          />
        </ArchivingContainer>
      </ScrollView>
    </>
  )
}
