import React from 'react'

import { Image, ScrollView, View } from 'react-native'
import { useRecoilState } from 'recoil'

import { defaultIcons } from '@/assets'
import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { RecycleBinTabProps } from '@/models/Recycle'
import { CheckArchivingState } from '@/state/CheckState'

import {
  CheckBox,
  Container,
  SearchDataText,
  TabItemCardContainer,
  TabItemContainer,
  Title,
  YellowCheck,
} from '../RecycleBin.style'

/**
 * 삭제된 아카이빙만 보여주는 탭
 */
export const ArchivingTab = ({ archivings, editMode }: RecycleBinTabProps) => {
  const [isCheck, setIsCheck] = useRecoilState(CheckArchivingState)

  /**
   * 체크박스 클릭을 핸들링합니다.
   */
  const handleCheck = (item: number) => {
    if (isCheck.includes(item)) {
      setIsCheck(isCheck.filter((id) => id !== item))
      return
    } else {
      setIsCheck([...isCheck, item])
      return
    }
  }

  return (
    <Container>
      <TabItemContainer>
        <ScrollView>
          <SearchDataText>
            {i18n.t('numberOfRecycleItem', { number: archivings.length })}
          </SearchDataText>
          <Title>{i18n.t('archiving')}</Title>
          <TabItemCardContainer>
            {archivings !== undefined &&
              archivings.map((item) => (
                <>
                  <View>
                    <ArchivingCard
                      key={item.archivingId}
                      item={item}
                      isMine={true}
                    />
                    {editMode && <CheckBox onPress={() => handleCheck(item.archivingId)} />}
                    {editMode && isCheck.includes(item.archivingId) && (
                      <YellowCheck onPress={() => handleCheck(item.archivingId)}>
                        <Image source={defaultIcons.yellowCheck} />
                      </YellowCheck>
                    )}
                  </View>
                </>
              ))}
          </TabItemCardContainer>
        </ScrollView>
      </TabItemContainer>
    </Container>
  )
}
