import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource } from 'react-native'
import Config from 'react-native-config'
import { useMutation, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

import { patchScrapArchiving } from '@/apis/archiving'
import { defaultIcons, defaultImages } from '@/assets'
import PhotoIcon from '@/assets/icons/photo.svg'
import ScrapIcon from '@/assets/icons/scrap.svg'
import ScrapFillIcon from '@/assets/icons/scrap_fill.svg'
import ScrapSmallIcon from '@/assets/icons/scrap_small.svg'
import { ArchivingListContent } from '@/models/Archiving'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { CommunityCategoryState } from '@/state/CategoryState'
import { colors } from '@/styles/colors'

import {
  Card,
  Container,
  CountContainer,
  CountText,
  Icon,
  ArchivingImage,
  Scrap,
  Title,
} from './PopularArchivingCard.style'

interface PopularArchivingCardProps {
  item: ArchivingListContent
}

/**
 * PopularArchivingCard
 */
export const PopularArchivingCard = ({ item }: PopularArchivingCardProps) => {
  const queryClient = useQueryClient()
  const navigation = useNavigation<MainNavigationProp>()

  const [isImageError, setIsImageError] = useState(false)
  const { title, imageUrl, imgCnt, linkCnt, scrapCnt, archivingId, markStatus } = item

  const communityCurrentCategory = useRecoilValue(CommunityCategoryState)

  const { mutate: scrapMutate } = useMutation(() => patchScrapArchiving(markStatus, archivingId), {
    /**
     * scrapMutate 성공 시, communityCurrentCategory를 업데이트 합니다.
     */
    onSuccess: () => {
      queryClient.invalidateQueries(['getCommunityArchivingList', communityCurrentCategory])
      queryClient.invalidateQueries(['getPopularArchivings'])
    },
  })

  /**
   *
   */
  const handleScrap = () => {
    scrapMutate()
  }

  return (
    <Container
      onPress={() => {
        navigation.navigate('ContentList', { id: archivingId, title: title })
      }}
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
        <Scrap onPress={handleScrap}>
          {markStatus ? (
            <ScrapFillIcon
              width={32}
              height={32}
              color={'transparent'}
            />
          ) : (
            <ScrapIcon
              width={32}
              height={32}
              color={colors.white}
            />
          )}
        </Scrap>
        <CountContainer>
          <PhotoIcon />
          <CountText>{imgCnt}</CountText>
          <Icon source={defaultIcons.link} />
          <CountText>{linkCnt}</CountText>
          <ScrapSmallIcon />
          <CountText>{scrapCnt}</CountText>
        </CountContainer>
      </Card>
    </Container>
  )
}
