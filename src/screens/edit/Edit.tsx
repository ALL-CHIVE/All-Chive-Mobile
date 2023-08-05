import React, { useRef, useState } from 'react'

import ActionSheet from '@alessiocancian/react-native-actionsheet'
import { RouteProp, useNavigation } from '@react-navigation/native'
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { useRecoilState } from 'recoil'

import { getContentsInfo, patchContents } from '@/apis/content'
import { BoxButton } from '@/components/buttons/boxButton/BoxButton'
import { CloseButtonHeader } from '@/components/headers/closeButtonHeader/CloseButtonHeader'
import { SelectArchivingModal } from '@/components/modal/selectArchivingModal/SelectArchivingModal'
import { GrayTag } from '@/components/tag/grayTag/GrayTag'
import i18n from '@/locales'
import { GetContentsInfoResponse } from '@/models/Contents'
import { ImageUploadMenuType, ImageUploadMenus } from '@/models/enums/ActionSheetType'
import { ContentType } from '@/models/enums/ContentType'
import { MainNavigationProp } from '@/navigations/MainNavigator'
import { RootStackParamList } from '@/navigations/RootStack'
import { handleImageUploadMenu } from '@/services/ActionSheetService'
import { SelectArchivingState } from '@/state/upload/SelectArchivingState'
import { SelectTagState } from '@/state/upload/SelectTagState'
import { colors } from '@/styles/colors'

import {
  AddTagButton,
  AddTagText,
  ArchivingSelect,
  Condition,
  Container,
  PlusImageButton,
  RowView,
  Styles,
  TextInput,
  Title,
} from './Edit.style'

interface EditProps {
  route: RouteProp<RootStackParamList, 'Edit'>
}

/**
 *
 */
export const Edit = ({ route }: EditProps) => {
  const navigation = useNavigation<MainNavigationProp>()
  const [archivingName, setArchivingName] = useState('')
  const [contentName, setContentName] = useState('')
  const [link, setLink] = useState('')
  const [image, setImage] = useState<ImageSourcePropType | ''>('')
  const [memo, setMemo] = useState('')

  const [openArchivingModal, setOpenArchivingModal] = useState(false)

  const [contentFocus, setContentFocus] = useState(false)
  const [linkFocus, setLinkFocus] = useState(false)
  const [memoFocus, setMemoFocus] = useState(false)

  const [selectArchiving, setSelectArchiving] = useRecoilState(SelectArchivingState)
  const [selectTag, setSelectTag] = useRecoilState(SelectTagState)

  const actionSheetRef = useRef<ActionSheet>(null)

  const { data: content } = useQuery<GetContentsInfoResponse>(
    ['contentsInfo', route.params.id],
    () => getContentsInfo(route.params.id),
    {
      /**
       *
       */
      onSuccess: (content) => {
        setArchivingName(content.archivingTitle)
        setContentName(content.contentTitle)
        setLink(content.link)
        setMemo(content.contentMemo)
        setImage(content.imgUrl ? { uri: content.imgUrl } : '')
        setSelectTag(
          content.tagList.map((tag) => {
            return { tagId: tag.tagId, name: tag.name }
          })
        )
      },
    }
  )

  const { mutate: patchContentsMutate } = useMutation(
    () =>
      patchContents({
        contentId: route.params.id,
        contentType: route.params.type,
        archivingId: selectArchiving.id,
        title: contentName,
        link: link,
        imgUrl: '',
        tagIds: selectTag.map((tag) => tag.tagId),
        memo: memo,
      }),
    {
      /**
       *
       */
      onSuccess: () => {
        setSelectArchiving({ id: -1, title: '' })
        setSelectTag([])
        navigation.goBack()
      },
      /**
       *
       */
      onError: () => {
        // TODO: 에러 처리
      },
    }
  )

  /**
   *
   */
  const handleCloseModal = () => {
    setOpenArchivingModal(false)
    setArchivingName(selectArchiving.title)
  }

  /**
   *
   */
  const handleContentFocus = () => {
    setContentFocus(true)
  }

  /**
   *
   */
  const handleContentBlur = () => {
    setContentFocus(false)
  }

  /**
   *
   */
  const handleUploadImage = () => {
    actionSheetRef.current?.show()
  }

  /**
   *
   */
  const handleLinkFocus = () => {
    setLinkFocus(true)
  }

  /**
   *
   */
  const handleLinkBlur = () => {
    setLinkFocus(false)
  }

  /**
   *
   */
  const handleMemoFocus = () => {
    setMemoFocus(true)
  }

  /**
   *
   */
  const handleMemoBlur = () => {
    setMemoFocus(false)
  }

  /**
   *
   */
  const handleClose = () => {
    setSelectArchiving({ id: -1, title: '' })
    setSelectTag([])
    navigation.goBack()
  }

  /**
   *
   */
  const handlesubmit = () => {
    patchContentsMutate()
  }

  /**
   * handleActionSheetMenu
   */
  const handleActionSheetMenu = async (index: ImageUploadMenuType) => {
    const selectedImage = await handleImageUploadMenu(index)

    if (selectedImage) {
      setImage({ uri: selectedImage })
    }
  }

  return (
    <Container>
      <CloseButtonHeader
        title={i18n.t('update')}
        onClose={handleClose}
      />
      <Title>{i18n.t('archivingName')}</Title>
      <ArchivingSelect onPress={() => setOpenArchivingModal(true)}>
        {archivingName ? <Text>{archivingName}</Text> : <Text>{i18n.t('choiceArchiving')}</Text>}
        {/* TODO: 오른쪽 화살표 아이콘 추가 */}
      </ArchivingSelect>
      <SelectArchivingModal
        onClose={handleCloseModal}
        isVisible={openArchivingModal}
      />
      <Title>{i18n.t('contentName')}</Title>
      <TextInput
        placeholder={i18n.t('contentVerify')}
        value={contentName}
        onChangeText={setContentName}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        maxLength={15}
        style={[
          contentFocus ? Styles.inputFocus : null,
          !contentFocus && contentName.length > 0 ? Styles.inputWithValue : null,
        ]}
      />
      {/* TODO: Condition Icon 추가 */}
      <Condition style={[contentName.length > 0 ? Styles.conditionComplete : null]}>
        {i18n.t('contentVerify')}
      </Condition>
      {route.params.type === ContentType.Link && (
        <>
          <Title>{i18n.t('link')}</Title>
          <TextInput
            placeholder={i18n.t('placeHolderLink')}
            value={link}
            onChangeText={setLink}
            onFocus={handleLinkFocus}
            onBlur={handleLinkBlur}
            style={[
              linkFocus ? Styles.inputFocus : null,
              !linkFocus && link.length > 0 ? Styles.inputWithValue : null,
            ]}
          />
          {/* TODO: Condition Icon 추가 */}
          <Condition>{i18n.t('checkUrl')}</Condition>
        </>
      )}
      {route.params.type === ContentType.Image && (
        <>
          <Title>{i18n.t('image')}</Title>
          {image ? (
            <TouchableOpacity onPress={handleUploadImage}>
              <Image source={image} />
            </TouchableOpacity>
          ) : (
            <PlusImageButton onPress={handleUploadImage}>
              <Text>+</Text>
            </PlusImageButton>
          )}
          <ActionSheet
            ref={actionSheetRef}
            title={i18n.t('uploadImage')}
            options={ImageUploadMenus()}
            cancelButtonIndex={0}
            tintColor={colors.gray600}
            onPress={handleActionSheetMenu}
            theme="ios"
          />
        </>
      )}
      <RowView>
        <Title>{i18n.t('tag')}</Title>
        <Text>{i18n.t('choice10')}</Text>
      </RowView>
      <RowView>
        <ScrollView horizontal={true}>
          <AddTagButton onPress={() => navigation.navigate('CreateTag')}>
            <AddTagText>{`+ ${i18n.t('addTag')}`}</AddTagText>
          </AddTagButton>
          {selectTag &&
            selectTag.map((tag) => (
              <GrayTag
                key={tag.tagId}
                tag={tag.name}
                onRemove={() => {
                  setSelectTag(selectTag.filter((item) => item !== tag))
                }}
              />
            ))}
        </ScrollView>
      </RowView>
      <RowView>
        <Title>{i18n.t('memo')}</Title>
        <Text>{i18n.t('choice')}</Text>
      </RowView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={160}
      >
        <TextInput
          placeholder={i18n.t('placeHolderMemo')}
          value={memo}
          onChangeText={setMemo}
          onFocus={handleMemoFocus}
          onBlur={handleMemoBlur}
          maxLength={150}
          multiline
          style={[
            memoFocus ? Styles.inputFocus : null,
            !memoFocus && memo.length > 0 ? Styles.inputWithValue : null,
          ]}
        />
      </KeyboardAvoidingView>
      <BoxButton
        textKey={i18n.t('complete')}
        onPress={handlesubmit}
        isDisabled={!archivingName || !contentName || !link}
      />
    </Container>
  )
}
