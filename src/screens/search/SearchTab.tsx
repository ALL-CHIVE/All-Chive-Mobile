import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ScrollView, Text } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import { PopupMenu } from '@/models/PopupMenu'
import { ArchivingListContent } from '@/models/archiving/MainArchivingList'

import {
  SearchDataText,
  TabArchivingCardContainer,
  TabItemContainer,
  Title,
  WhiteDivider,
} from './Search.style'

interface SearchTabProps {
  searchData: {
    archivings: {
      content: ArchivingListContent[]
      page: number
      size: number
      hasNext: boolean
    }
    community: {
      content: ArchivingListContent[]
      page: number
      size: number
      hasNext: boolean
    }
  }
}

interface Route {
  key: string
  name: string
  params?: object | undefined
}

/**
 * 검색 창 내부 탭
 */
export const SearchTab = ({ searchData }: SearchTabProps) => {
  const Tab = createMaterialTopTabNavigator()

  return (
    <Tab.Navigator initialRouteName="AllTab">
      <Tab.Screen
        name="AllTab"
        options={{
          tabBarLabel: `전체`,
        }}
      >
        {(props) => (
          <AllTab
            {...props}
            searchData={searchData}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="ArchivingTab"
        component={ArchivingTab}
        options={{
          tabBarLabel: `내 아카이빙`,
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityTab}
        options={{
          tabBarLabel: `커뮤니티`,
        }}
      />
    </Tab.Navigator>
  )
}

/**
 * 전체 탭
 */
export const AllTab = ({ searchData }: SearchTabProps) => {
  /**
   *
   */
  const HandleFix = () => {
    // TODO: 아카이빙 고정 연결
  }

  /**
   *
   */
  const HandleRemove = () => {
    // TODO: 아카이빙 삭제 연결
  }

  const PopupMenuList: PopupMenu[] = [
    {
      title: 'fix',
      onClick: HandleFix,
    },
    { title: 'delete', onClick: HandleRemove },
  ]
  return (
    <TabItemContainer>
      <ScrollView>
        <SearchDataText>{`총 n개의 검색 결과`}</SearchDataText>
        <Title>내 아카이빙</Title>
        <TabArchivingCardContainer>
          {searchData.archivings.content.map((item) => (
            <ArchivingCard
              key={item.archivingId}
              title={item.title}
              day={item.createdAt}
              popupMenuList={PopupMenuList}
              imgCnt={item.imgCnt}
              linkCnt={item.linkCnt}
              scrapCnt={item.scrapCnt}
            />
          ))}
          <WhiteDivider />
          <SearchDataText>{`총 n개의 검색 결과`}</SearchDataText>
          <Title>커뮤니티</Title>
          {searchData.community.content.map((item) => (
            <ArchivingCard
              key={item.archivingId}
              title={item.title}
              day={item.createdAt}
              popupMenuList={PopupMenuList}
              imgCnt={item.imgCnt}
              linkCnt={item.linkCnt}
              scrapCnt={item.scrapCnt}
            />
          ))}
        </TabArchivingCardContainer>
      </ScrollView>
    </TabItemContainer>
  )
}

/**
 * 내 아카이빙만 보여주는 탭
 */
export const ArchivingTab = () => {
  return (
    <>
      <Text>아카이빙</Text>
    </>
  )
}

/**
 * 커뮤니티 모두 보여주는 탭
 */
export const CommunityTab = () => {
  return <></>
}
