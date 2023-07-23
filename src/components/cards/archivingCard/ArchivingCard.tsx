import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'

import { defaultIcons } from '@/assets'
import Popup from '@/components/popup/Popup'
import { PopupMenu } from '@/models/PopupMenu'
import { ArchivingListContent } from '@/models/archiving/MainArchivingList'
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

interface ArchivingListProps {
  item: ArchivingListContent
  popupMenuList?: PopupMenu[]
}

/**
 * ArchivingCard
 */
export const ArchivingCard = ({ item, popupMenuList }: ArchivingListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const { title, createdAt, imageUrl, imgCnt, linkCnt, scrapCnt } = item

  return (
    <Container
      onPress={() => {
        navigation.navigate('ContentList', { id: 1, title: title })
      }}
    >
      <Shadow
        startColor={colors.gray50}
        offset={[0, 0]}
        distance={4}
        style={Styles.shadow}
      >
        <Card>
          {!imageUrl ? (
            <Image source={{ uri: imageUrl }} />
          ) : (
            <Image source={defaultIcons.upload} />
          )}
          <Title
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Title>
          <Day>{createdAt}</Day>
          {popupMenuList && (
            <PopupContainer>
              <Popup menuList={popupMenuList} />
            </PopupContainer>
          )}
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
