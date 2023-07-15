import React from 'react'

import { Shadow } from 'react-native-shadow-2'

import { defaultIcons } from '@/assets'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { colors } from '@/styles/colors'

import {
  Card,
  Container,
  CountContainer,
  CountText,
  Day,
  Image,
  PopupContainer,
  Styles,
  Title,
} from './ArchivingCard.style'

interface ArchivingListProps {
  title: string
  day: string
  popupMenuList: PopupMenu[]
  imgCnt: number
  linkCnt: number
  scrapCnt: number
}

/**
 * ArchivingCard
 */
export const ArchivingCard = ({
  title,
  day,
  popupMenuList,
  imgCnt,
  linkCnt,
  scrapCnt,
}: ArchivingListProps) => {
  return (
    <Container>
      <Shadow
        startColor={colors.gray50}
        offset={[0, 0]}
        distance={4}
        style={Styles.shadow}
      >
        <Card>
          {/* 이미지 추후 수정 */}
          <Image source={defaultIcons.upload} />
          <Title
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Title>
          <Day>{day}</Day>
          <PopupContainer>
            <Popup
              icon=""
              menuList={popupMenuList}
            />
          </PopupContainer>
          <CountContainer>
            <CountText>{imgCnt}</CountText>
            <CountText>{linkCnt}</CountText>
            <CountText>{scrapCnt}</CountText>
          </CountContainer>
        </Card>
      </Shadow>
    </Container>
  )
}
