import { Alert } from 'react-native'

import i18n from '@/locales'

/**
 * 확인 / 취소 버튼 알림창 입니다
 */
export const createCancelConfirmAlert = (
  titleKey: string,
  messageKey: string,
  confirmAction: () => void
) => {
  Alert.alert(i18n.t(titleKey), i18n.t(messageKey), [
    {
      text: i18n.t('cancel'),
      style: 'cancel',
    },
    {
      text: i18n.t('confirm'),
      onPress: confirmAction,
    },
  ])
}
