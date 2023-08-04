import React from 'react'

import { ScrollView } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import i18n from '@/locales'
import { RecyclesResponse } from '@/models/Recycle'

import {
  Container,
  SearchDataText,
  TabItemCardContainer,
  TabItemContainer,
  Title,
} from '../RecycleBin.style'

/**
 * 내 아카이빙만 보여주는 탭
 */
export const ArchivingTab = ({ archivings }: RecyclesResponse) => {
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
                <ArchivingCard
                  key={item.archivingId}
                  item={item}
                  isMine={true}
                />
              ))}
          </TabItemCardContainer>
        </ScrollView>
      </TabItemContainer>
    </Container>
  )
}
