import React, { useState } from 'react'

import { TouchableOpacity, Image, View, Text } from 'react-native'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useSetRecoilState } from 'recoil'

import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { Divider } from '@/components/divider/Divider'
import i18n from '@/locales'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'

import { CreateArchivingModal } from '../createArchivingModal/CreateArchivingModal'

import {
  ArchivingText,
  CategoryText,
  CloseButton,
  Container,
  ListContainer,
  PlusButton,
  PlusButtonText,
  Title,
} from './ArchivingModal.style'

interface ArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const ArchivingModal = ({ onClose, isVisible }: ArchivingModalProps) => {
  const setSelectArchiving = useSetRecoilState(SelectArchivingState)
  const [openPlusModal, setOpenPlusModal] = useState(false)

  /**
   *
   */
  const handleClickArchiving = (value: string) => {
    setSelectArchiving(value)
  }

  /**
   *
   */
  const handleCloseModal = () => {
    setOpenPlusModal(false)
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        // backdropOpacity={0.5}
        style={{
          margin: 0,
        }}
      >
        <Container>
          <ScrollView>
            <CloseButton onPress={onClose}>
              <Image source={defaultIcons.grayCloseButton} />
            </CloseButton>
            <Title>{i18n.t('archiving')}</Title>
            <PlusButton onPress={() => setOpenPlusModal(true)}>
              <PlusButtonText>{`+ ${i18n.t('addArchiving')}`}</PlusButtonText>
            </PlusButton>
            <CreateArchivingModal
              onClose={handleCloseModal}
              isVisible={openPlusModal}
            />
            <ListContainer>
              {ArchivingList &&
                Object.keys(ArchivingList).map((category) =>
                  ArchivingList[category].map((item, index) => (
                    <>
                      <CategoryText>{i18n.t(`${category}`)}</CategoryText>
                      <Divider />
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleClickArchiving(item.title)}
                      >
                        <ArchivingText>{`ㄴ ${item.title}  ${item.contentCnt}`}</ArchivingText>
                        <Divider />
                      </TouchableOpacity>
                    </>
                  ))
                )}
            </ListContainer>
            <BoxButton
              onPress={onClose}
              textKey={i18n.t('confirm')}
              isDisabled={!SelectArchivingState}
            />
          </ScrollView>
        </Container>
      </Modal>
    </>
  )
}

// 추후 삭제
interface ArchivingItem {
  title: string
  contentCnt: number
}
interface ArchivingList {
  [category: string]: ArchivingItem[]
}

const ArchivingList: ArchivingList = {
  food: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  life: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  homeLiving: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  shopping: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  sport: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  selfImprovement: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  tech: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  design: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
  trend: [
    {
      title: '아카이빙 제목',
      contentCnt: 1,
    },
  ],
}
