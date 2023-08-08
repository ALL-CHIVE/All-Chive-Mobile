import React, { useEffect, useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getArchivingList } from '@/apis/archiving'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { CreateArchivingModal } from '@/components/modal/archivingModal/createArchivingModal/CreateArchivingModal'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'

import { PlusButton, PlusButtonText, WhiteDivider } from './ArchivingManagement.style'
import { ArchivingList } from './components/ArchivingList'

interface ArchivingManagementProps {
  route: RouteProp<RootStackParamList, 'ArchivingManagement'>
}

/**
 *
 */
export const ArchivingManagement = ({ route }: ArchivingManagementProps) => {
  const navigation = useNavigation<MainNavigationProp>()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  const { data: archivingListData } = useQuery('archivingList', () => getArchivingList())

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => <LeftButtonHeader title={i18n.t('archivingManagement')} />,
    })
  })

  /**
   *
   */
  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false)
  }

  return (
    <>
      <ScrollView
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
      </ScrollView>
      <CreateArchivingModal
        onClose={handleCloseCreateModal}
        isVisible={isCreateModalVisible}
      />
    </>
  )
}
