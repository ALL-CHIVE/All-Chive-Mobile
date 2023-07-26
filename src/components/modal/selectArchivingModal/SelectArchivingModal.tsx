import React, { useState } from 'react'

import { TouchableOpacity, Image } from 'react-native'
import { ScrollView } from 'react-native'
import Modal from 'react-native-modal'
import { useQuery } from 'react-query'
import { useSetRecoilState } from 'recoil'

import { getArchivingList } from '@/apis/archiving'
import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { Divider } from '@/components/divider/Divider'
import i18n from '@/locales'
import { ArchivingListResponse } from '@/models/Archiving'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'

import { CreateArchivingModal } from '../archivingModal/createArchivingModal/CreateArchivingModal'

import {
  ArchivingText,
  CategoryText,
  CloseButton,
  Container,
  ListContainer,
  PlusButton,
  PlusButtonText,
  Title,
} from './SelectArchivingModal.style'

interface SelectArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const SelectArchivingModal = ({ onClose, isVisible }: SelectArchivingModalProps) => {
  const setSelectArchiving = useSetRecoilState(SelectArchivingState)
  const [createModal, setCreateModal] = useState(false)

  const { data: archivingList } = useQuery<ArchivingListResponse>(['getArchivingList'], () =>
    getArchivingList()
  )

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
    setCreateModal(false)
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
            <PlusButton onPress={() => setCreateModal(true)}>
              <PlusButtonText>{`+ ${i18n.t('addArchiving')}`}</PlusButtonText>
            </PlusButton>
            <CreateArchivingModal
              onClose={handleCloseModal}
              isVisible={createModal}
            />
            <ListContainer>
              {archivingList &&
                Object.keys(archivingList).map((category) => (
                  <>
                    <CategoryText>{i18n.t(`${category}`)}</CategoryText>
                    <Divider />
                    {archivingList[category].map((item, index) => (
                      <>
                        <TouchableOpacity
                          key={index}
                          onPress={() => handleClickArchiving(item.title)}
                        >
                          <ArchivingText>{`ㄴ ${item.title}  ${item.contentCnt}`}</ArchivingText>
                          <Divider />
                        </TouchableOpacity>
                      </>
                    ))}
                  </>
                ))}
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
