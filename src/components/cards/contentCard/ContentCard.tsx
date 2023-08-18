import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { ImageURISource } from 'react-native/types'
import Config from 'react-native-config'
import { Shadow } from 'react-native-shadow-2'

import { defaultImages } from '@/assets'
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
} from './ContentCard.style'

interface ContentCardProps {
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
              navigation.navigate('ContentDetail', { id: contentId })
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
          <ImageContainer>
            <Image
              source={
                !imgUrl
                  ? defaultImages.content
                  : {
                      uri:
                        contentType === ContentType.Link
                          ? imgUrl
                          : `${Config.ALLCHIVE_ASSET_STAGE_SERVER}/${imgUrl}`,
                    }
              }
              defaultSource={defaultImages.content as ImageURISource}
            />
            <Type>
              <TypeText>{i18n.t(contentType.toLocaleLowerCase())}</TypeText>
            </Type>
          </ImageContainer>
          <Information>
            <Title numberOfLines={1}>{contentTitle}</Title>
            <Day>{contentCreatedAt}</Day>
            {tag && (
              <TagContainer>
                <WhiteTag tag={tag} />
                <WhiteTag tag={`+${tagCount - 1}`} />
              </TagContainer>
            )}
          </Information>
        </Card>
      </Shadow>
    </Container>
  )
}

export default ContentCard
