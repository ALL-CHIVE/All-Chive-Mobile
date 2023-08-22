import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource } from 'react-native'
import Config from 'react-native-config'
import FastImage from 'react-native-fast-image'
import { Shadow } from 'react-native-shadow-2'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { deleteArchiving, patchPinArchiving, patchScrapArchiving } from '@/apis/archiving'
import { defaultIcons, defaultImages } from '@/assets'
import PhotoIcon from '@/assets/icons/photo.svg'
import ScrapIcon from '@/assets/icons/scrap.svg'
import ScrapFillIcon from '@/assets/icons/scrap_fill.svg'
import ScrapSmallIcon from '@/assets/icons/scrap_small.svg'
import TwoButtonDialog from '@/components/dialogs/twoButtonDialog/TwoButtonDialog'
import Popup from '@/components/popup/Popup'
import { ArchivingListContent } from '@/models/Archiving'
import { PopupMenu } from '@/models/PopupMenu'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { CategoryState, CommunityCategoryState } from '@/state/CategoryState'
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
  PinIcon,
} from './ArchivingCard.style'

interface ArchivingCardProps {
  item: ArchivingListContent
  isMine?: boolean
  isRecycle?: boolean
  isSearch?: boolean
}

/**
 * ArchivingCard
 */
export const ArchivingCard = ({ item, isMine, isRecycle, isSearch }: ArchivingCardProps) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<MainNavigationProp>()

  const [isImageError, setIsImageError] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  const { title, createdAt, imageUrl, imgCnt, linkCnt, scrapCnt, archivingId, markStatus } = item

  const currentCategory = useRecoilValue(CategoryState)
  const communityCurrentCategory = useRecoilValue(CommunityCategoryState)

  const { mutate: deleteMutate } = useMutation('deleteArchiving', deleteArchiving, {
    /**
     * deleteMutate 성공 시 홈 화면을 리패치합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
      if (item.publicStatus) {
        queryClient.invalidateQueries(['getCommunityArchivingList'])
        queryClient.invalidateQueries(['getScrapArchivingList'])
        queryClient.invalidateQueries(['getPopularArchivings'])
      }
      queryClient.invalidateQueries(['getUser'])
    },
  })

  const { mutate: scrapMutate } = useMutation(() => patchScrapArchiving(markStatus, archivingId), {
    /**
     * scrapMutate 성공 시, communityCurrentCategory를 업데이트 합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getCommunityArchivingList', communityCurrentCategory])
      queryClient.invalidateQueries(['getPopularArchivings'])
      queryClient.invalidateQueries(['getScrapArchivingList', currentCategory])
    },
  })
  const { mutate: pinMutate } = useMutation(() => patchPinArchiving(markStatus, archivingId), {
    /**
     * pinMutate 성공 시, currentCategory를 업데이트 합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getHomeArchivingList', currentCategory])
    },
  })

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
  }

  /**
   *
   */
  const handlePin = () => {
    pinMutate()
  }

  const popupMenuList: PopupMenu[] = [
    markStatus ? { title: 'unblock', onClick: handlePin } : { title: 'fix', onClick: handlePin },
    { title: 'delete', onClick: showDeleteDialog },
  ]

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
        startColor={colors.commonShadow}
        offset={[0, 0]}
        distance={6}
        style={Styles.shadow}
      >
        <Card>
          {isImageError || !imageUrl ? (
            <ArchivingImage
              source={defaultImages.thumbnail}
              defaultSource={defaultImages.thumbnail as ImageURISource}
              onError={() => setIsImageError(true)}
            />
          ) : (
            <FastImage
              source={{ uri: `${Config.ALLCHIVE_ASSET_SERVER}/${imageUrl}` }}
              style={{ width: 97, height: 90, top: 9, left: 7, borderRadius: 8, marginRight: 10 }}
              onError={() => setIsImageError(true)}
              defaultSource={defaultImages.thumbnail as number}
            />
          )}
          <Title
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Title>
          <Day>{createdAt}</Day>
          {isRecycle || isSearch ? (
            <></>
          ) : isMine ? (
            <>
              <PopupContainer>
                <Popup menuList={popupMenuList} />
              </PopupContainer>
              {markStatus && (
                <Pin>
                  <PinIcon source={defaultIcons.pinFill} />
                </Pin>
              )}
            </>
          ) : (
            <Scrap onPress={handleScrap}>
              {markStatus ? (
                <ScrapFillIcon color={colors.gray500} />
              ) : (
                <ScrapIcon color={colors.gray500} />
              )}
            </Scrap>
          )}
          <CountContainer>
            <PhotoIcon />
            <CountText>{imgCnt}</CountText>
            <Icon source={defaultIcons.link} />
            <CountText>{linkCnt}</CountText>
            <ScrapSmallIcon />
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
