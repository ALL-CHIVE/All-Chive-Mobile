import React from 'react'

import { AxiosError } from 'axios'
import { ScrollView, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

import { CategoryList } from '@/components/list/CategoryList'
import { Subject } from '@/components/subject/Subject'
import i18n from '@/locales'
import { PopupMenu } from '@/models/PopupMenu'
import { ArchivingCategoryList } from '@/models/category/CategoryList'
import { AllSubjectListState } from '@/recoils/SubjectListState'
import { subjectState } from '@/state/subjectState'
import { colors } from '@/styles/colors'

import {
  ArchivingContainer,
  CategoryContainer,
  CategoryListContainer,
  NicknameText,
  SearchBar,
  TitleText,
} from './Archiving.style'
import { getCategoryList } from './apis/getCategoryList'

/**
 *
 */
export const Archiving = () => {
  const currentSubjectState = useRecoilValue(subjectState)
  const allSubjectList = useRecoilValue(AllSubjectListState)
  const { data: categoryList } = useQuery<ArchivingCategoryList, AxiosError>(
    ['getCategoryList'],
    () =>
      getCategoryList({
        subject: currentSubjectState,
        page: 1,
        limit: 10,
      })
  )

  /**
   *
   */
  const handleUplaod = () => {
    // console.log('upload') // upload 화면으로 navigation
  }

  /**
   *
   */
  const handleClickSubject = (value: string) => {
    // TODO: currentSubjectState에 따른 카테고리 리스트 불러오기
  }

  return (
    <>
      <ScrollView>
        <LinearGradient colors={[colors.yellow200, colors.white]}>
          <ArchivingContainer>
            <SearchBar />
            {/* Profile Button */}
            <NicknameText>다카이브님</NicknameText>
            <TitleText>{i18n.t('youHaveSavedArchives', { number: 10 })}</TitleText>
            <ScrollView horizontal={true}>
              <CategoryContainer>
                <Subject
                  options={allSubjectList}
                  onPress={handleClickSubject}
                />
              </CategoryContainer>
            </ScrollView>
            <CategoryListContainer>
              <TouchableOpacity>
                <CategoryList
                  title="흑백 타이포 그래피 래퍼 아카이빙 흑백 타이포 그래피 래퍼 아카이빙"
                  day="2022.10.27"
                  popupMenuList={PopupMenuList}
                  imgCnt={1}
                  linkCnt={2}
                  scrapCnt={3}
                />
              </TouchableOpacity>
            </CategoryListContainer>
          </ArchivingContainer>
        </LinearGradient>
      </ScrollView>
    </>
  )
}

/**
 *
 */
const HandleFix = () => {
  // TODO
}

/**
 *
 */
const HandleRemove = () => {
  // TODO
}

const PopupMenuList: PopupMenu[] = [
  {
    title: 'fix',
    onClick: HandleFix,
  },
  { title: 'delete', onClick: HandleRemove },
]
