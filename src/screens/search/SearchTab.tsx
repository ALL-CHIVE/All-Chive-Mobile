import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { ScrollView } from 'react-native'

import { ArchivingCard } from '@/components/cards/archivingCard/ArchivingCard'
import { ArchivingListContent } from '@/models/Archiving'

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
        options={{
          tabBarLabel: `내 아카이빙`,
        }}
      >
        {(props) => (
          <ArchivingTab
            {...props}
            searchData={searchData}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="CommunityTab"
        options={{
          tabBarLabel: `커뮤니티`,
        }}
      >
        {(props) => (
          <CommunityTab
            {...props}
            searchData={searchData}
          />
        )}
      </Tab.Screen>
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

  return (
    <TabItemContainer>
      <ScrollView>
        <SearchDataText>{`총 n개의 검색 결과`}</SearchDataText>
        <Title>내 아카이빙</Title>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.archivings.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isMine={true}
              />
            ))}
          <WhiteDivider />
          <SearchDataText>{`총 n개의 검색 결과`}</SearchDataText>
          <Title>커뮤니티</Title>
          {searchData !== undefined &&
            searchData.community.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isMine={false}
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
export const ArchivingTab = ({ searchData }: SearchTabProps) => {
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

  return (
    <TabItemContainer>
      <ScrollView>
        <SearchDataText>{`총 n개의 검색 결과`}</SearchDataText>
        <Title>내 아카이빙</Title>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.archivings.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isMine={true}
              />
            ))}
        </TabArchivingCardContainer>
      </ScrollView>
    </TabItemContainer>
  )
}

/**
 * 커뮤니티 모두 보여주는 탭
 */
export const CommunityTab = ({ searchData }: SearchTabProps) => {
  return (
    <TabItemContainer>
      <ScrollView>
        <SearchDataText>{`총 n개의 검색 결과`}</SearchDataText>
        <Title>커뮤니티</Title>
        <TabArchivingCardContainer>
          {searchData !== undefined &&
            searchData.community.content.map((item) => (
              <ArchivingCard
                key={item.archivingId}
                item={item}
                isMine={true}
              />
            ))}
        </TabArchivingCardContainer>
      </ScrollView>
    </TabItemContainer>
  )
}
