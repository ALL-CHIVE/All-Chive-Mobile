import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'
import { useQuery } from 'react-query'

import { getArchivingList } from '@/apis/archiving'
import DefaultContainer from '@/components/containers/defaultContainer/DefaultContainer'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { CreateArchivingModal } from '@/components/modal/archivingModal/createArchivingModal/CreateArchivingModal'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import {
  Bottom,
  PlusButton,
  PlusButtonText,
  ScrollContainer,
  WhiteDivider,
} from './ArchivingManagement.style'
import { ArchivingList } from './components/ArchivingList'

/**
 * 아카이빙 관리
 */
export const ArchivingManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  const { data: archivingListData } = useQuery('archivingList', () => getArchivingList())

  /**
   *
   */
  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false)
  }

  return (
    <DefaultContainer>
      <LeftButtonHeader title={i18n.t('archivingManagement')} />
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {archivingListData &&
          Object.keys(archivingListData).map((category) => (
            <>
              {archivingListData[category].length > 0 && (
                <>
                  <ArchivingList
                    category={category}
                    archivingListData={archivingListData[category]}
                  />
                  <WhiteDivider />
                </>
              )}
            </>
          ))}
        <PlusButton onPress={() => setIsCreateModalVisible(true)}>
          <PlusButtonText>{`+ ${i18n.t('addArchiving')}`}</PlusButtonText>
        </PlusButton>
        <Bottom />
      </ScrollContainer>
      <CreateArchivingModal
        onClose={handleCloseCreateModal}
        isVisible={isCreateModalVisible}
      />
    </DefaultContainer>
  )
}
