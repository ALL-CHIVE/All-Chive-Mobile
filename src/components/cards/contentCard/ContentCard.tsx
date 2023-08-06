import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { Shadow } from 'react-native-shadow-2'

import { defaultImages } from '@/assets'
import { WhiteTag } from '@/components/tag/whiteTag/WhiteTag'
import i18n from '@/locales'
import { SimpleContent } from '@/models/SimpleContent'
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
}: SimpleContent) => {
  const navigation = useNavigation<MainNavigationProp>()

  return (
    <Container onPress={() => navigation.navigate('ContentDetail', { id: contentId })}>
      <Shadow
        startColor={colors.gray50}
        offset={[0, 0]}
        distance={4}
        style={Styles.shadow}
      >
        <Card>
          <ImageContainer>
            <Image source={imgUrl ? { uri: imgUrl } : defaultImages.content} />
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
