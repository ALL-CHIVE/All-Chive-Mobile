import React from 'react'

import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'

import { Container, CountContainer, CountText, Day, Image, Title } from './CategoryList.style'

interface CategoryListProps {
  title: string
  day: string
  popupMenuList: PopupMenu[]
  imgCnt: number
  linkCnt: number
  scrapCnt: number
}

/**
 *
 */
export const CategoryList = ({
  title,
  day,
  popupMenuList,
  imgCnt,
  linkCnt,
  scrapCnt,
}: CategoryListProps) => {
  return (
    <>
      <Container>
        {/* 이미지 추후 수정 */}
        <Image source={require('@/assets/icon_upload.png')} />
        <Title
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Title>
        <Day>{day}</Day>
        <Popup
          icon=""
          menuList={popupMenuList}
        />
        <CountContainer>
          <CountText>{imgCnt}</CountText>
          <CountText>{linkCnt}</CountText>
          <CountText>{scrapCnt}</CountText>
        </CountContainer>
      </Container>
    </>
  )
}
