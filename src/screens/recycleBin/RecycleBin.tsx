import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { useQuery } from 'react-query'

import { getRecycles } from '@/apis/recycle'
import { defaultImages } from '@/assets'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { Container, ImageContainer, SubTitleText, TabContainer } from './RecycleBin.style'
import { RecycleBinTab } from './tabs/RecycleBinTab'

/**
 * 마이페이지 '휴지통'
 */
export const RecycleBin = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [editMode, setEditMode] = useState(false)

  const { data: recycleData } = useQuery<RecyclesResponse>(['recycleBinData'], getRecycles)

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => (
        <LeftButtonHeader
          title={i18n.t('recycleBin')}
          rightButtonText={editMode ? i18n.t('complete') : i18n.t('edit')}
          rightButtonClick={() => setEditMode(!editMode)}
        />
      ),
    })
  })

  return (
    <Container>
      {recycleData ? (
        <TabContainer>
          <RecycleBinTab
            contents={recycleData.contents}
            archivings={recycleData.archivings}
          />
        </TabContainer>
      ) : (
        <>
          <ImageContainer>
            <Image source={defaultImages.emptyItem} />
            <SubTitleText>{i18n.t('emptyRecycleBin')}</SubTitleText>
          </ImageContainer>
        </>
      )}
    </Container>
  )
}
