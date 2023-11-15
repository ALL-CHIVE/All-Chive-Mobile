import React from 'react'

import Modal from 'react-native-modal'

import DialogButton from '@/components/buttons/dialogButton/DialogButton'
import Checkbox from '@/components/checkbox/Checkbox'
import useCheckBox from '@/hooks/useCheckBox'
import i18n from '@/locales'
import { WithdrawalOptions } from '@/models/WithdrawalOptions'
import { colors } from '@/styles/colors'

import {
  Container,
  Title,
  Description,
  Options,
  Styles,
  Option,
  RowView,
} from './WithDrawalOptionDialog.style'

interface WithdrawalOptionDialogProps {
  isVisible: boolean
  onComplete: () => void
}

/**
 * WithdrawalOptionDialog
 */
const WithdrawalOptionDialog = ({ isVisible, onComplete }: WithdrawalOptionDialogProps) => {
  const { checkBox, toggleCheckBox } = useCheckBox({
    infrequentlyUsed: false,
    lotsOfBugs: false,
    useOtherServices: false,
    feeIsExpensive: false,
    createNewAccount: false,
    etc: false,
  } as WithdrawalOptions)

  return (
    <Modal
      style={Styles.modal}
      statusBarTranslucent={true}
      isVisible={isVisible}
    >
      <Container>
        <Title>{i18n.t('tellUsWithdrawalReason')}</Title>
        <Description>{i18n.t('useServiceImpromentMaterial')}</Description>
        <Options>
          {Object.entries(checkBox).map(([key, value]) => (
            <RowView
              key={key}
              onPress={() => toggleCheckBox(key as keyof typeof checkBox)}
            >
              <Checkbox isChecked={value} />
              <Option>{i18n.t(key)}</Option>
            </RowView>
          ))}
        </Options>
        <DialogButton
          title="withdrawal"
          onPress={onComplete}
          color={colors.white}
          backgroundColor={colors.gray500}
        />
      </Container>
    </Modal>
  )
}

export default WithdrawalOptionDialog
