import React, { useState } from 'react'

import { ListRenderItem, ScrollView } from 'react-native'
import { useRecoilValue } from 'recoil'

import { BoxButton } from '@/components/button/BoxButton'
import ImageButton from '@/components/imageButton/ImageButton'
import i18n from '@/locales'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { SubjectListState } from '@/recoils/SubjectListState'

import { Container, Description, Heading, SelectButton, SubjectList } from './SelectSubject.style'

interface SelectSubjectProps {
  navigation: MainNavigationProp
}

/**
 * SelectSubject
 */
const SelectSubject = ({ navigation }: SelectSubjectProps) => {
  const subjectList = useRecoilValue(SubjectListState)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  /**
   * 주제 선택을 처리합니다.
   */
  const handleSubjectPress = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((selectedSubject) => selectedSubject !== subject))
    } else if (selectedSubjects.length < 3) {
      setSelectedSubjects((prev) => [...prev, subject])
    }
  }

  /**
   * 선택 완료 버튼 클릭 액션을 처리합니다.
   */
  const handleSubmitSubjects = () => {
    console.log(selectedSubjects)
    // TODO: api 전달
    navigation.navigate('AddProfile')
  }

  /**
   * SubjectList 내 아이템을 반환합니다
   */
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <ImageButton
        title={item}
        updateSelectedList={handleSubjectPress}
        disabled={selectedSubjects.length >= 3 && !selectedSubjects.includes(item)}
      />
    )
  }

  return (
    <ScrollView>
      <Container>
        <Heading>{i18n.t('niceMeetYouWhatIsYourHobby')}</Heading>
        <Description>{i18n.t('chooseMaximum3')}</Description>
        <SubjectList
          scrollEnabled={false}
          data={subjectList}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(subject) => subject}
        />
        <SelectButton>
          <BoxButton
            textKey="selectCompleted"
            onPress={handleSubmitSubjects}
            isDisabled={selectedSubjects.length <= 0}
          />
        </SelectButton>
      </Container>
    </ScrollView>
  )
}

export default SelectSubject
