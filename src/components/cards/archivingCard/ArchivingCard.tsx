import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'

import { defaultIcons } from '@/assets'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'
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

interface ArchivingCardProps {
  id: number
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
  id,
  title,
  day,
  popupMenuList,
  imgCnt,
  linkCnt,
  scrapCnt,
}: ArchivingCardProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container
      onPress={() => {
        navigation.navigate('ContentList', { id: id, title: title })
      }}
    >
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
