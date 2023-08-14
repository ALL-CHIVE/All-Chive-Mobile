import React, { useEffect, useState } from 'react'

import { RouteProp, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useQuery, useQueryClient } from 'react-query'

import { getArchivingList } from '@/apis/archiving'
import { ErrorDialog } from '@/components/dialogs/errorDialog/ErrorDialog'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import { Loading } from '@/components/loading/Loading'
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
 * 아카이빙 관리
 */
export const ArchivingManagement = ({ route }: ArchivingManagementProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const queryClient = useQueryClient()

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)

  const {
    data: archivingListData,
    isLoading,
    isError,
  } = useQuery(['archivingList'], () => getArchivingList())

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
      {isLoading && <Loading />}
      <ErrorDialog
        isVisible={isError}
        onClick={() => {
          queryClient.invalidateQueries(['archivingList'])
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {archivingListData &&
          Object.keys(archivingListData).map((category) => (
            <React.Fragment key={category}>
              {archivingListData[category].length > 0 && (
                <>
                  <ArchivingList
                    category={category}
                    archivingListData={archivingListData[category]}
                  />
                  <WhiteDivider />
                </>
              )}
            </React.Fragment>
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
