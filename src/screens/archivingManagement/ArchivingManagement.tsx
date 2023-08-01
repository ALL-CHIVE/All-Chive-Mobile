import React, { useEffect, useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { useQuery } from 'react-query'

import { getArchivingList } from '@/apis/archiving'
import { LeftButtonHeader } from '@/components/headers/leftButtonHeader/LeftButtonHeader'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'

import { PlusButton, PlusButtonText, WhiteDivider } from './ArchivingManagement.style'
import { ArchivingList } from './components/ArchivingList'

/**
 *
 */
export const ArchivingManagement = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const actionSheetRef = useRef<ActionSheet>(null)

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)

  const { data: archivingListData } = useQuery('archivingList', () => getArchivingList())

  useEffect(() => {
    navigation.setOptions({
      /**
       * header
       */
      header: () => <LeftButtonHeader title={i18n.t('archivingManagement')} />,
    })
  })

  return (
    <>
      <ScrollView>
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
    </>
  )
}
