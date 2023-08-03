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
  const handleClickArchiving = (value: [number, string]) => {
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
            <ScrollView>
              {archivingList &&
                Object.keys(archivingList).map((category) => (
                  <>
                    {archivingList[category].length > 0 && (
                      <>
                        <CategoryText>{i18n.t(`${category.toUpperCase()}`)}</CategoryText>
                        <Divider />
                        {archivingList[category].map((item) => (
                          <>
                            <TouchableOpacity
                              key={item.archivingId}
                              onPress={() => handleClickArchiving([item.archivingId, item.title])}
                            >
                              <ArchivingText>{`ㄴ ${item.title}  ${item.contentCnt}`}</ArchivingText>
                            </TouchableOpacity>
                            <Divider />
                          </>
                        ))}
                      </>
                    )}
                  </>
                ))}
            </ScrollView>
          </ListContainer>
          <BoxButton
            onPress={onClose}
            textKey={i18n.t('confirm')}
            isDisabled={!SelectArchivingState}
          />
        </Container>
      </Modal>
    </>
  )
}
