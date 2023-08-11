import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Image, ImageURISource } from 'react-native'
import Config from 'react-native-config'
import { Shadow } from 'react-native-shadow-2'
import { useMutation } from 'react-query'

import { deleteArchiving, patchPinArchiving, patchScrapArchiving } from '@/apis/archiving'
import { defaultIcons, defaultImages } from '@/assets'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import Popup from '@/components/popup/Popup'
import { ArchivingListContent } from '@/models/Archiving'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import {
  Card,
  Container,
  CountContainer,
  CountText,
  Day,
  Icon,
  ArchivingImage,
  PopupContainer,
  Scrap,
  Styles,
  Title,
  Pin,
} from './ArchivingCard.style'

interface ArchivingCardProps {
  item: ArchivingListContent
  isMine?: boolean
  isRecycle?: boolean
}

/**
 * ArchivingCard
 */
export const ArchivingCard = ({ item, isMine, isRecycle }: ArchivingCardProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const [isImageError, setIsImageError] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const { title, createdAt, imageUrl, imgCnt, linkCnt, scrapCnt, archivingId, markStatus } = item
  const [isMark, setIsMark] = useState(markStatus)

  const { mutate: deleteMutate } = useMutation('deleteArchiving', deleteArchiving)
  const { mutate: scrapMutate } = useMutation(() => patchScrapArchiving(isMark, archivingId))
  const { mutate: pinMutate } = useMutation(() => patchPinArchiving(isMark, archivingId))

  /**
   *
   */
  const handleFix = () => {
    // TODO
  }

  /**
   *
   */
  const showDeleteDialog = () => {
    setIsDeleteDialogVisible(true)
  }

  /**
   *
   */
  const handleDelete = () => {
    deleteMutate(archivingId)
  }

  /**
   *
   */
  const handleScrap = () => {
    scrapMutate()
    setIsMark((prev) => !prev)
  }

  /**
   *
   */
  const handlePin = () => {
    pinMutate()
    setIsMark((prev) => !prev)
  }

  const popupMenuList: PopupMenu[] = [{ title: 'delete', onClick: showDeleteDialog }]

  return (
    <Container
      {...(isRecycle
        ? {
            disabled: true,
          }
        : {
            /**
             * 휴지통에서의 아카이빙 카드가 아닐 경우에만 onPress 이벤트를 추가합니다.
             */
            onPress: () => {
              navigation.navigate('ContentList', { id: archivingId, title: title })
            },
          })}
    >
      <Shadow
        startColor={colors.gray50}
        offset={[0, 0]}
        distance={4}
        style={Styles.shadow}
      >
        <Card>
          <ArchivingImage
            source={
              isImageError || !imageUrl
                ? defaultImages.thumbnail
                : { uri: `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${imageUrl}` }
            }
            onError={() => setIsImageError(true)}
            defaultSource={defaultImages.thumbnail as ImageURISource}
          />
          <Title
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Title>
          <Day>{createdAt}</Day>
          {isMine ? (
            <>
              <PopupContainer>
                <Popup menuList={popupMenuList} />
              </PopupContainer>
              <Pin onPress={handlePin}>
                {isMark ? (
                  <Image source={defaultIcons.pinFill} />
                ) : (
                  <Image
                    style={{ width: 16, height: 16 }}
                    source={defaultIcons.pin}
                  />
                )}
              </Pin>
            </>
          ) : (
            <Scrap onPress={handleScrap}>
              {isMark ? (
                <Image source={defaultIcons.scrapFill} />
              ) : (
                <Image source={defaultIcons.scrap} />
              )}
            </Scrap>
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
      <TwoButtonDialog
        isVisible={isDeleteDialogVisible}
        title="doYouWantDeleteThisArchiving"
        imageUrl={defaultImages.recycleBin}
        completeText="delete"
        onCancel={() => {
          setIsDeleteDialogVisible(false)
        }}
        onComplete={() => {
          setIsDeleteDialogVisible(false)
          handleDelete()
        }}
      />
    </Container>
  )
}
