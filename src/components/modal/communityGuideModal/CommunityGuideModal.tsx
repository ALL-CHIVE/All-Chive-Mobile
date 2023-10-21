import React, { useEffect, useState } from 'react'

import FirstIndicator from '@/assets/icons/first-indicator.svg'
import SecondIndicator from '@/assets/icons/second-indicator.svg'
import XMark from '@/assets/icons/x-mark.svg'
import BottomSheet from '@/components/bottomSheet/BottomSheet'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import i18n from '@/locales'
import {
  getIsCommunityGuideVisible,
  setIsCommunityGuideVisible,
} from '@/services/localStorage/LocalStorage'
import { colors } from '@/styles/colors'

import {
  CloseButton,
  Container,
  ContentContainer,
  GuideImage,
  Header,
  ImageContainer,
  SubTitle,
  Title,
} from './CommunityGuideModal.style'
import { Pages } from './CommunityGuidePages'

/**
 * CommunityGuideModal
 */
const CommunityGuideModal = () => {
  const [guideVisible, setGuideVisible] = useState(false)
  const [contentIndex, setContentIndex] = useState(0)

  useEffect(() => {
    getIsCommunityGuideVisible().then((res) => setGuideVisible(res))
  }, [])

  /**
   * onClose
   */
  const onClose = () => {
    setGuideVisible(false)
    setIsCommunityGuideVisible(false)
  }

  /**
   * onClick
   */
  const onClick = () => {
    switch (contentIndex) {
      case 0:
        setContentIndex(1)
        break
      case 1:
        onClose()
    }
  }

  return (
    <BottomSheet
      isVisible={guideVisible}
      onClose={onClose}
      onModalHide={() => null}
    >
      <Container>
        <Header>
          <CloseButton onPress={onClose}>
            <XMark color={colors.gray600} />
          </CloseButton>
        </Header>
        <ContentContainer>
          <SubTitle>{i18n.t('introduceAllchive')}</SubTitle>
          <Title>{i18n.t(Pages[contentIndex].title)}</Title>
          <ImageContainer>
            <GuideImage
              resizeMode="center"
              source={Pages[contentIndex].image}
              style={{
                width: Pages[contentIndex].width,
                height: Math.min(Pages[contentIndex].height, 250),
              }}
            />
          </ImageContainer>
          {contentIndex === 0 ? <FirstIndicator /> : <SecondIndicator />}
        </ContentContainer>
        <BoxButton
          textKey={Pages[contentIndex].buttonText}
          onPress={onClick}
        />
      </Container>
    </BottomSheet>
  )
}

export default CommunityGuideModal
