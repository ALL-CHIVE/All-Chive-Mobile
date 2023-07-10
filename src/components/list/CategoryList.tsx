import React from 'react'

import { Shadow } from 'react-native-shadow-2'

import { defaultIcons, icons } from '@/assets'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { colors } from '@/styles/colors'

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
      <Shadow
        style={{ width: '100%', borderRadius: 8 }}
        distance={5}
        startColor={colors.gray50}
      >
        <Container>
          {/* 이미지 추후 수정 */}
          <Image source={defaultIcons.upload} />
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
      </Shadow>
    </>
  )
}
