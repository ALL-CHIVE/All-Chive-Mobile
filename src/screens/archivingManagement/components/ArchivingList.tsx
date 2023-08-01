import React from 'react'

import i18n from '@/locales'
import { ArchivingItem } from '@/models/Archiving'

import {
  ArchivingContainer,
  CategoryBox,
  CategoryContainer,
  CategoryText,
  Container,
  GrayText,
} from './ArchivingList.style'

interface ArchivingListProps {
  category: string
  archivingListData: ArchivingItem[]
}

/**
 * 마이페이지 내 '아카이빙 관리'에서 보여지는 아카이빙 리스트
 */
export const ArchivingList = ({ category, archivingListData }: ArchivingListProps) => {
  return (
    <Container>
      <CategoryContainer>
        <CategoryBox>
          <CategoryText>{i18n.t(`${category.toUpperCase()}`)}</CategoryText>
        </CategoryBox>
      </CategoryContainer>
      {archivingListData.map((item) => (
        <>
          <ArchivingContainer>
            <GrayText>{`${item.title}  ${item.contentCnt}`}</GrayText>
          </ArchivingContainer>
        </>
      ))}
    </Container>
  )
}
