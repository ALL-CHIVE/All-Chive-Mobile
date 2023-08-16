import React, { useState } from 'react'

import { Image, View } from 'react-native'
import Modal from 'react-native-modal'
import { useQuery } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { getArchivingList } from '@/apis/archiving'
import { defaultIcons } from '@/assets'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import DefaultScrollContainer from '@/components/containers/defaultScrollContainer/DefaultScrollContainer'
import { Divider } from '@/components/divider/Divider'
import i18n from '@/locales'
import { ArchivingListResponse } from '@/models/Archiving'
import { SelectArchivingState, SelectedArchiving } from '@/state/upload/SelectArchivingState'
import { SelectCategoryState } from '@/state/upload/SelectCategoryState'

import { CreateArchivingModal } from '../archivingModal/createArchivingModal/CreateArchivingModal'

import {
  ArchivingTitle as ArchivingTitle,
  CategoryTitle,
  CloseButton,
  ModalContainer,
  Header,
  ListContainer,
  AddArchivingButton,
  AddArchivingText,
  Title,
  Container,
  ArchivingHeader,
  ArchivingButton,
  Styles,
} from './SelectArchivingModal.style'

interface SelectArchivingModalProps {
  onClose: () => void
  isVisible: boolean
}

/**
 *
 */
export const SelectArchivingModal = ({ onClose, isVisible }: SelectArchivingModalProps) => {
  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)
  const setSelectCategory = useSetRecoilState(SelectCategoryState)
  const [createModal, setCreateModal] = useState(false)

  const { data: archivingList } = useQuery<ArchivingListResponse>(['getArchivingList'], () =>
    getArchivingList()
  )

  /**
   *
   */
  const handleClickArchiving = (value: SelectedArchiving) => {
    setSelectArchiving(value)
  }

  /**
   *
   */
  const handleCloseModal = () => {
    setSelectCategory('')
    setCreateModal(false)
  }

  return (
    <>
      <Modal
        isVisible={isVisible}
        backdropOpacity={0.5}
        onBackdropPress={onClose}
        style={{
          margin: 0,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <ModalContainer>
          <Header>
            <CloseButton onPress={onClose}>
              <Image source={defaultIcons.grayCloseButton} />
            </CloseButton>
          </Header>
          <ArchivingHeader>
            <Title>{i18n.t('archiving')}</Title>
            <AddArchivingButton onPress={() => setCreateModal(true)}>
              <AddArchivingText>{`+ ${i18n.t('addArchiving')}`}</AddArchivingText>
            </AddArchivingButton>
          </ArchivingHeader>
          <DefaultScrollContainer>
            <Container>
              <ListContainer>
                {archivingList &&
                  Object.keys(archivingList).map((category) => (
                    <View key={category}>
                      {archivingList[category].length > 0 && (
                        <>
                          <CategoryTitle>{i18n.t(`${category}`)}</CategoryTitle>
                          <Divider />
                          {archivingList[category].map((item) => (
                            <View key={item.archivingId}>
                              <ArchivingButton
                                key={item.archivingId}
                                onPress={() =>
                                  handleClickArchiving({ id: item.archivingId, title: item.title })
                                }
                              >
                                <Image source={defaultIcons.leftProvider} />
                                <ArchivingTitle
                                  style={
                                    item.archivingId === selectArchiving.id &&
                                    Styles.SelectedArchiving
                                  }
                                >
                                  {`${item.title}  ${item.contentCnt}`}
                                </ArchivingTitle>
                                {item.archivingId === selectArchiving.id && (
                                  <Image source={defaultIcons.selectedIcon} />
                                )}
                              </ArchivingButton>
                              <Divider />
                            </View>
                          ))}
                        </>
                      )}
                    </View>
                  ))}
              </ListContainer>
            </Container>
          </DefaultScrollContainer>
          <BoxButton
            onPress={onClose}
            textKey={i18n.t('confirm')}
            isDisabled={selectArchiving.id === -1}
          />
        </ModalContainer>
        <CreateArchivingModal
          onClose={handleCloseModal}
          isVisible={createModal}
        />
      </Modal>
    </>
  )
}
