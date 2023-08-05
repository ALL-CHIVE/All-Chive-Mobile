import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getRecycles } from '@/apis/recycle'
import { defaultImages } from '@/assets'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { CheckArchivingState, CheckContentState, CheckState } from '@/state/CheckState'
import { colors } from '@/styles/colors'

import {
  BottomButton,
  BottomButtonContainer,
  BottomButtonText,
  BottomButtonTitle,
  Container,
  ImageContainer,
  SubTitleText,
  TabContainer,
} from './RecycleBin.style'
import { RecycleBinTab } from './tabs/RecycleBinTab'

/**
 * 마이페이지 '휴지통'
 */
export const RecycleBin = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [editMode, setEditMode] = useState(false)
  const [isCheckArchiving, setIsCheckArchiving] = useRecoilState(CheckArchivingState)
  const [isCheckContent, setIsCheckContent] = useRecoilState(CheckContentState)
  const [isCheckState, setIsCheckState] = useRecoilState(CheckState)

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
          rightButtonClick={handleEditMode}
        />
      ),
    })
  })

  /**
   *
   */
  const handleEditMode = () => {
    setEditMode(!editMode)
    setIsCheckArchiving([])
    setIsCheckContent([])
  }

  /**
   *
   */
  const handleDelete = () => {
    // TODO: 삭제 API 호출
  }

  /**
   *
   */
  const handleRestore = () => {
    // TODO: 복원 API 호출
  }

  return (
    <Container>
      {recycleData ? (
        <>
          <TabContainer>
            <RecycleBinTab
              contents={recycleData.contents}
              archivings={recycleData.archivings}
              editMode={editMode}
            />
          </TabContainer>

          {editMode && (
            <BottomButtonContainer>
              <LinearGradient
                style={{
                  width: '100%',
                  height: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 24,
                }}
                colors={[colors.white, colors.gray500]}
              >
                <BottomButton
                  onPress={() => {
                    handleDelete
                  }}
                >
                  <BottomButtonText>{i18n.t('allDelete')}</BottomButtonText>
                </BottomButton>
                {isCheckArchiving.length > 0 || isCheckContent.length > 0 ? (
                  <>
                    <BottomButtonTitle>
                      {i18n.t('numberOfSelectItem', {
                        number: isCheckArchiving.length + isCheckContent.length,
                      })}
                    </BottomButtonTitle>
                  </>
                ) : (
                  <>
                    <BottomButtonTitle>{i18n.t('selectItem')}</BottomButtonTitle>
                  </>
                )}

                <BottomButton
                  onPress={() => {
                    handleRestore
                  }}
                >
                  <BottomButtonText>{i18n.t('allRestore')}</BottomButtonText>
                </BottomButton>
              </LinearGradient>
            </BottomButtonContainer>
          )}
        </>
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
