import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource } from 'react-native'
import { Shadow } from 'react-native-shadow-2'

import { deleteArchiving } from '@/apis/archiving/archiving'
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
  Icon,
  Image,
  PopupContainer,
  Styles,
  Title,
} from './ArchivingCard.style'

interface ArchivingListProps {
  item: ArchivingListContent
  isMine?: boolean
}

/**
 * ArchivingCard
 */
export const ArchivingCard = ({ item, isMine }: ArchivingListProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const { title, createdAt, imageUrl, imgCnt, linkCnt, scrapCnt, archivingId } = item

  /**
   *
   */
  const HandleFix = () => {
    // TODO
  }

  /**
   *
   */
  const HandleRemove = () => {
    deleteArchiving(archivingId)
  }

  const popupMenuList: PopupMenu[] = [{ title: 'delete', onClick: HandleRemove }]

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
          <Image
            source={{ uri: imageUrl }}
            defaultSource={defaultIcons.upload as ImageURISource}
          />
          <Title
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Title>
          <Day>{createdAt}</Day>
          {isMine && (
            <PopupContainer>
              <Popup menuList={popupMenuList} />
            </PopupContainer>
          )}
          <CountContainer>
            <Icon source={defaultIcons.photoWhite} />
            <CountText>{imgCnt}</CountText>
            <Icon source={defaultIcons.linkWhite} />
            <CountText>{linkCnt}</CountText>
            <Icon source={defaultIcons.scrapWhite} />
            <CountText>{scrapCnt}</CountText>
          </CountContainer>
        </Card>
      </Shadow>
    </Container>
  )
}
