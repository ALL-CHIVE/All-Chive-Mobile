import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource } from 'react-native/types'
import FastImage from 'react-native-fast-image'
import { Shadow } from 'react-native-shadow-2'

import { defaultIcons, defaultImages } from '@/assets'
import PhotoIcon from '@/assets/icons/photo.svg'
import { WhiteTag } from '@/components/tag/whiteTag/WhiteTag'
import i18n from '@/locales'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { colors } from '@/styles/colors'

import {
  Image,
  Card,
  Title,
  Day,
  Styles,
  Container,
  Type,
  TypeText,
  ImageContainer,
  Information,
  TagContainer,
  Icon,
} from './ContentCard.style'

interface ContentCardProps {
  archivingId: number
  contentId: number
  contentTitle: string
  contentType: string
  link: string
  imgUrl: string
  contentCreatedAt: string
  tag: string
  tagCount: number
  isRecycle?: boolean
}

/**
 * ContentCard
 */
const ContentCard = ({
  archivingId,
  contentId,
  contentTitle,
  contentType,
  link,
  imgUrl,
  contentCreatedAt,
  tag,
  tagCount,
  isRecycle,
}: ContentCardProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container
      {...(isRecycle
        ? {
            disabled: true,
          }
        : {
            /**
             * 휴지통에서의 컨텐츠 카드가 아닐 경우에만 onPress 이벤트를 추가합니다.
             */
            onPress: () => {
              navigation.navigate('ContentDetail', {
                archivingId: archivingId,
                contentId: contentId,
              })
            },
          })}
    >
      <Shadow
        startColor={colors.commonShadow}
        offset={[0, 0]}
        distance={4}
        style={Styles.shadow}
      >
        <Card>
          <ImageContainer>
            {!imgUrl ? (
              <Image
                source={defaultImages.content}
                defaultSource={defaultImages.content as ImageURISource}
              />
            ) : (
              <FastImage
                style={{ width: '100%', height: '100%', opacity: 0.6 }}
                source={{ uri: imgUrl }}
                defaultSource={defaultImages.content as number}
              />
            )}
            <Type>
              {contentType === ContentType.Link ? (
                <Icon source={defaultIcons.link} />
              ) : (
                <PhotoIcon />
              )}
              <TypeText>{i18n.t(contentType.toLocaleLowerCase())}</TypeText>
            </Type>
          </ImageContainer>
          <Information>
            <Title numberOfLines={1}>{contentTitle}</Title>
            <Day>{contentCreatedAt}</Day>
            {tag && (
              <TagContainer>
                <WhiteTag tag={tag} />
                {tagCount > 1 && <WhiteTag tag={`+${tagCount - 1}`} />}
              </TagContainer>
            )}
          </Information>
        </Card>
      </Shadow>
    </Container>
  )
}

export default ContentCard
