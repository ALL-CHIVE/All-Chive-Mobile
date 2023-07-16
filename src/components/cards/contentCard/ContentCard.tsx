import React from 'react'

import { Shadow } from 'react-native-shadow-2'

import i18n from '@/locales'
import { ContentType } from '@/models/enums/ContentType'
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
  Tag,
  TagContainer,
  TagCount,
  TagText,
  TagCountText,
} from './ContentCard.style'

interface ContentCardProps {
  id: string
  title: string
  day: string
  imageUrl: string
  tags: string[]
  type: ContentType
}

/**
 * ContentCard
 */
const ContentCard = ({ id, title, day, imageUrl, tags, type }: ContentCardProps) => {
  return (
    <Container>
      <Shadow
        startColor={colors.gray50}
        offset={[0, 0]}
        distance={4}
        style={Styles.shadow}
      >
        <Card>
          <ImageContainer>
            <Image source={{ uri: imageUrl }} />
            <Type>
              <TypeText>{i18n.t(type)}</TypeText>
            </Type>
          </ImageContainer>
          <Information>
            <Title numberOfLines={1}>{title}</Title>
            <Day>{day}</Day>
            {tags && tags.length > 0 && (
              <TagContainer>
                <Tag>
                  <TagText>{tags[0]}</TagText>
                </Tag>
                <TagCount>
                  <TagCountText>+{tags.length - 1}</TagCountText>
                </TagCount>
              </TagContainer>
            )}
          </Information>
        </Card>
      </Shadow>
    </Container>
  )
}

export default ContentCard
